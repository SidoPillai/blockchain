/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock() {
        this.getBlockHeight().then((height) => {
            if (height === -1) {
                let genesisBlock = new Block.Block('First block in the chain - Genesis block');                
                Promise.resolve(this.addBlock(genesisBlock)).then((result) => { 
                    console.log("Created Genesis Block ", result); 
                }).catch((err) => {
                    console.log('Error creating genesis block ', err)
                });
            }
        }).catch((err) => {
            reject(err);
        });        
    }

    getBlockHeight() {
        let self = this;
        return new Promise ((resolve, reject) => {
            self.bd.getBlocksCount().
            then((count) => {
                resolve(count-1);
            }).catch((err) => { 
                reject(err)
            });
        });
    }

    addBlockToTheChain(position, block) {
        let self = this;
        return new Promise((resolve, reject) => {
            block.hash = SHA256(JSON.stringify(block)).toString();
            self.bd.addLevelDBData(position, JSON.stringify(block)).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err)
            });
        }); 
    }

    // Add new block
    addBlock(block) {
        let self = this;                
        return new Promise ((resolve, reject) => {
            self.bd.getBlocksCount().
            then((count) => {
                block.height = count
                block.time = new Date().getTime().toString().slice(0,-3);                
                if (count > 0) {                    
                    Promise.resolve(this.getBlock(count-1)).then((prevBlock) => {
                        block.previousBlockHash = prevBlock.hash                                                
                        Promise.resolve(this.addBlockToTheChain(count, block)).then((result) => {
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                } else {
                    Promise.resolve(this.addBlockToTheChain(count, block)).then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }).catch((err) => {
                console.log('addBlock() - Unable to get height ', err);
            })
        });
    }

    // Get Block By Height
    getBlock(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.bd.getLevelDBData(height).then((block) => {                
                if (typeof block !== 'undefined') {
                    resolve(JSON.parse(block));
                } else {
                    reject('getBlock() - Block not found at height ' + height);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        return new Promise( (resolve,reject) => {            
            Promise.resolve(this.getBlock(height)).then((block) => {
                var currentBlockHash = block.hash;
                block.hash = "";
                var SHAOfBlock = SHA256(JSON.stringify(block)).toString();
                if (currentBlockHash === SHAOfBlock) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => { 
                reject('validateBlock() - Block not found at ' + height);
            });    
        })
    }

    validateCurrentBlock(height, totalNoOfBlocks) {   

        return new Promise((resolve,reject) => {                        
            
            Promise.resolve(this.getBlock(height)).then((block) => {
                var currentBlockHash = block.hash;
                block.hash = "";
                var SHAOfBlock = SHA256(JSON.stringify(block)).toString();    

                if (currentBlockHash === SHAOfBlock) {
                    // Skip the last block since next block is not available
                    if (height !== totalNoOfBlocks) {
                        Promise.resolve(this.getBlock(height+1)).then((nextBlock) => {
                            var nextBlockPreviousBlockHash = nextBlock.previousBlockHash;
                            if (currentBlockHash !== nextBlockPreviousBlockHash) {
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        }).catch((err) => {
                            resolve(false)
                        });
                    } else {
                        resolve(true);
                    }                    
                } else {
                    resolve(false);
                }
            }).catch((err) => { console.log(err); reject(err)});
        })    
    }

    // Validate Blockchain
    validateChain() {
        return new Promise( (resolve, reject) => {
            this.getBlockHeight().then((height) => {    
                // Create an array of promises
                var promises = [] 
                for (var i = 1; i <= height; i++) {
                    promises.push(Promise.resolve(this.validateCurrentBlock(i, height)))
                }
                // Get the results asynchronously
                Promise.all(promises).then((result) => {                
                    // Check for resolved values and add to an array 
                    //  for failed results
                    var res = []
                    for (var j = 0; j < result.length; j++) {
                        if (!result[j]) {
                            res.push('Block ' + (j+1) + ' is defected')
                        }
                    }
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        });        
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }
   
}

module.exports.Blockchain = Blockchain;
