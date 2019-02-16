const Block = require('./Block.js');
const BlockChain = require('./BlockChain.js');
const bitcoinMessage = require('bitcoinjs-message');

// Constant Timeout Window
const TimeoutRequestsWindowTime = 5*60*1000;

// Initialize the blockchain
let myBlockChain = new BlockChain.Blockchain();

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;

        // MEMPOOL CACHE
        this.mempoolDict = {} 
        this.timeoutRequests = []       
        this.mempoolValid = []

        // POST REQUEST
        this.postRequestValidation();
        this.postMessageSignatureValidation();
        this.postBlock();

        // GET REQUEST
        this.getBlockByHash();
        this.getBlockByHeight();
        this.getBlockByAddress();
    }

    /**
     * Adds the walletAddress to the mempool
     * @param {*} walletAddress 
     */
    async addRequestValidation(walletAddress) {
        if (!this.mempoolDict[walletAddress]) {
            this.mempoolDict[walletAddress] = new Date().getTime().toString().slice(0,-3);
            this.setRequestTimeouts(walletAddress, this.mempoolDict);
        }
        return Promise.resolve(this.requestObject(walletAddress));
    }
    
    /**
     * Set the time out window for the incoming walletAddress in the mempool
     * @param {*} walletAddress 
     * @param {*} mempool 
     */
    async setRequestTimeouts(walletAddress, mempool) {
        this.timeoutRequests[walletAddress] = setTimeout(() => {
            delete mempool[walletAddress];
        }, TimeoutRequestsWindowTime);
    }

    /**
     * Removes walletAddress from mempool after validation
     * @param {*} walletAddress 
     */
    async removeValidationRequest(walletAddress) {
        delete this.mempoolDict[walletAddress];
    }

    /**
     * Checks whether the walletAddress is available in mempool
     * Constructs the message in a JSON format
     * 
     * @param {*} walletAddress 
     */
    async requestObject(walletAddress) {
        if (this.mempoolDict[walletAddress]) {
            let reqTimeStamp = this.mempoolDict[walletAddress];
            let timeElapsed = (new Date().getTime().toString().slice(0,-3)) - reqTimeStamp;
            let timeRemaining = (TimeoutRequestsWindowTime/1000) - timeElapsed;
            var messageObject = new Object();
            messageObject.walletAddress = walletAddress;
            messageObject.requestTimeStamp = reqTimeStamp.toString();
            messageObject.message = walletAddress+":"+reqTimeStamp.toString()+":"+"starRegistry";
            messageObject.validationWindow = timeRemaining;    
            return Promise.resolve(JSON.stringify(messageObject));
        } else {
            return Promise.reject(walletAddress + ' not found');
        }
    }

    /**
     * Checks whether the given wallet address is part of the validated mempool
     * @param {*} walletAddress 
     */
    isAddressPreviouslyValidated(walletAddress) {
        let isValid = false;
        if (this.mempoolValid.length > 0) {
            for (let index = 0; index < this.mempoolValid.length; index++) {
                let validedObject = this.mempoolValid[index];
                if (validedObject.status.address === walletAddress) {
                    isValid = true;
                    this.mempoolValid.splice(index,1);
                    break;
                }
            }
            return isValid;
        } else {
            return isValid;
        }
    }

    /**
     * Web API POST endpoint to validate request with JSON response
     * http://localhost:8000/requestValidation
     */
    async postRequestValidation() {
        this.app.post("/requestValidation", (req, res) => {
            if (Object.keys(req.body).length === 0) {
                res.send("Invalid request! Please refer README.md for sending request")
            } else {
                Promise.resolve(this.addRequestValidation(req.body.address))
                .then((data) => {
                    res.send(JSON.parse(data));
                })
                .catch((err) => { 
                    res.send(err);
                });
            }
        });
    }

    /**
     * Web API POST endpoint to validates message signature with JSON response
     * http://localhost:8000/message-signature/validate
     */
    async postMessageSignatureValidation() {
        this.app.post("/message-signature/validate", (req, res) => {
            if (Object.keys(req.body).length === 0) {
                res.send("Invalid request! Please refer README.md for sending request")
            } else {
                Promise.resolve(this.processSignature(req.body)).then((block) => {
                    res.send(JSON.parse(block));
                }).catch((err) => {
                    res.send(err);
                });
            }
        });
    }

    /**
     * This method get the block from mempool and 
     * checks message signature if the validation window time is not expired and returns the object 
     * @param {*} body 
     */
    async processSignature(body) {
        let _body = JSON.parse(JSON.stringify(body));
        let walletAddress = _body.address.toString();
        let messageSignature = _body.signature.toString();        
        let result = await this.requestObject(walletAddress);
        let jsonObj = JSON.parse(result);
        let _message = jsonObj.message.toString();
        let _address = jsonObj.walletAddress.toString();
        let _window = jsonObj.validationWindow;        
        if (_window > 0) {
            let _timeStamp = jsonObj.requestTimeStamp.toString();
            var statusObj = new Object();                    
            statusObj.address = _address;
            statusObj.requestTimeStamp = _timeStamp;
            statusObj.message = _message;                    
            statusObj.validationWindow = _window;                    
            let isMessageVerified = false;
            try {
                isMessageVerified = bitcoinMessage.verify(_message, _address, messageSignature);
                statusObj.messageSignature = isMessageVerified;
                var validObj = new Object();                    
                validObj.registerStar = true;
                validObj.status = JSON.parse(JSON.stringify(statusObj));                                        
                if (isMessageVerified) {
                    this.mempoolValid.push(validObj);
                    this.removeValidationRequest(_address);
                }
                return Promise.resolve(JSON.stringify(validObj));    
            } catch(err) {
                return Promise.reject('Invalid signature length! Please refer README.md for sending request')
            }           
        } else {
            return Promise.reject('Validation Window expired for ' + walletAddress);
        }
    }

    /**
     * Web API POST endpoint to add a valid block in the blockchain with JSON response
     * http://localhost:8000/block
     */
    async postBlock() {
        this.app.post("/block", (req, res) => {
            if (Object.keys(req.body).length === 0) {
                res.send("Invalid request! Please refer README.md for sending request")
            } else {
                let processBlock = this.processBlockPost(JSON.stringify(req.body));
                processBlock.then((block) => {
                    myBlockChain.addBlock(block).then((result) => {
                        res.send(JSON.parse(result));
                    }).catch((err) =>{
                        res.send(err);
                    });
                }).catch((err) => {
                    res.send(err);
                });
            }
        });
    }

    /**
     * 
     * @param {*} body 
     */
    async processBlockPost(body) {
        let _body = JSON.parse(body)
        let starData = _body.star;
        let _story = starData.story;
        if (!starData.ra || !starData.dec || !_story) {
            return Promise.reject('Invalid request! ra, dec, story cannot be empty');
        }
        let walletAddress = _body.address;
        let isValid = this.isAddressPreviouslyValidated(walletAddress);
        if (isValid) {                                
            if (_story.length > 500) {
                return Promise.reject('Invalid request! Star story supports ASCII text, limited to 250 words (500 bytes)');                
            } else {                
                starData.story = Buffer.from(_story, 'utf8').toString('hex');                    
                var obj = Object()
                obj.address = walletAddress;
                obj.star = starData
                let block = new Block(obj);
                return Promise.resolve(block);
            }                
        } else {
            return Promise.reject('Not a valid address ' + walletAddress);
        } 
    }

    /**
     * Web API GET endpoint to get a star block by hash in the blockchain with JSON response
     * http://localhost:8000/stars/hash:[HASH]
     */
    async getBlockByHash() {
        this.app.get("/stars/hash::hash", (req, res) => {
            try {
                let paramaters = JSON.parse(JSON.stringify(req.params));
                myBlockChain.getBlockByHash(paramaters.hash.toString()).then((block) => {
                    res.send(block);
                }).catch((err) => {
                    res.send(err);
                });    
            } catch(err) {
                res.send(JSON.stringify(err));
            }
        });
    }    

    /**
     * Web API GET endpoint to get a star block by address in the blockchain with JSON response
     * http://localhost:8000/stars/address:[ADDRESS]
     */
    async getBlockByAddress() {
        this.app.get("/stars/address::address", (req, res) => {
            let paramaters = JSON.parse(JSON.stringify(req.params));
            myBlockChain.getBlockByAddress(paramaters.address).then((block) => {
                res.send(block);
            }).catch((err) => {
                res.send(err);
            });
        });
    }

    /**
     * Web API GET endpoint to get a star block by heught in the blockchain with JSON response
     * http://localhost:8000/block/[HEIGHT]
     */
    async getBlockByHeight() {
        this.app.get("/block/:index", (req, res) => {
            let paramaters = JSON.parse(JSON.stringify(req.params));
            myBlockChain.getBlockByHeight(paramaters.index).then((block) => {
                res.send(block);
            }).catch((err) => {
                res.send(err);
            });
        });
    }
}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}