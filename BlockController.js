const BlockClass = require('./Block.js');
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
        this.mempool = []
        this.requestTimeStamp = [];
        this.timeoutRequests = [];
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
        if (!this.mempool.includes(walletAddress)) {
            this.mempool.push(walletAddress);
            this.timeoutRequests.push(walletAddress);
            this.requestTimeStamp.push(new Date().getTime().toString().slice(0,-3));
            this.setRequestTimeouts(walletAddress, this.mempool);
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
            let index = mempool.indexOf(walletAddress);
            if (index > -1) {
                mempool.splice(index,1);
                this.requestTimeStamp.splice(index,1);
                this.timeoutRequests.splice(index,1);    
            }    
        }, TimeoutRequestsWindowTime);
    }

    /**
     * Removes walletAddress from mempool after validation
     * @param {*} walletAddress 
     */
    async removeValidationRequest(walletAddress) {
        let index = this.mempool.indexOf(walletAddress);
        if (index > -1) {
            this.mempool.splice(index,1);
            this.requestTimeStamp.splice(index,1);
            this.timeoutRequests.splice(index,1);    
        }
    }

    /**
     * Checks whether the walletAddress is available in mempool
     * Constructs the message in a JSON format
     * 
     * @param {*} walletAddress 
     */
    async requestObject(walletAddress) {
        let index = this.mempool.indexOf(walletAddress);
        if (index > -1) {
            let reqTimeStamp = this.requestTimeStamp[index];
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
                Promise.resolve(this.addRequestValidation(JSON.parse(JSON.stringify(req.body)).address.toString()))
                .then((data) => {
                    res.send(data);
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
                    res.send(block);
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
                this.mempoolValid.push(validObj)                    
                if (isMessageVerified) this.removeValidationRequest(_address);
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
                let processBlock = Promise.resolve(this.processBlockPost(JSON.stringify(req.body)));
                processBlock.then((block) => {
                    myBlockChain.addBlock(block).then((result) => {
                        res.send(result);
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
            let walletAddress = _body.address.toString();
            let isValid = this.isAddressPreviouslyValidated(walletAddress);
            if (isValid) {                    
                let starData = JSON.parse(JSON.stringify(_body.star));                    
                if (Object.prototype.toString.call(starData) === '[object Array]') {
                    return Promise.reject('Invalid request! Only one Star can be send in the request');
                } else {
                    let _story = starData.story;                    
                    if (_story.length > 500) {
                        return Promise.reject('Invalid request! Star story supports ASCII text, limited to 250 words (500 bytes)');
                    } else {
                        let encodeStory = new Buffer.from(_story).toString('hex');
                        starData.story = encodeStory;                    
                        var obj = Object()
                        obj.address = walletAddress;
                        obj.star = starData
                        let block = new BlockClass.Block(obj);
                        return Promise.resolve(block);
                    }
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
        this.app.get("/stars/hash:hash", (req, res) => {
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
        this.app.get("/stars/address:address", (req, res) => {
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
            myBlockChain.getBlock(paramaters.index).then((block) => {
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