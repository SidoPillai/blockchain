const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const BlockChain = require('./BlockChain.js');

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
        // this.blocks = [];
        // this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", (req, res) => {
            // Add your code here
            let paramaters = JSON.parse(JSON.stringify(req.params));
            myBlockChain.getBlock(paramaters.index).then((block) => {
                res.send(block);
            }).catch((err) => {
                res.send(err);
            });
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/block", (req, res) => {
            // Add your code here
            if (Object.keys(req.body).length === 0) {
                res.send("Invalid request! Please refer README.md for sending request")
            } else {
                let body = JSON.parse(JSON.stringify(req.body));
                let block = new BlockClass.Block(body.body.toString());            
                myBlockChain.addBlock(block).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            }
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    // initializeMockData() {
    //     if(this.blocks.length === 0){
    //         for (let index = 0; index < 10; index++) {
    //             let blockAux = new BlockClass.Block(`Test Data #${index}`);
    //             blockAux.height = index;
    //             blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
    //             this.blocks.push(blockAux);
    //         }
    //     }
    // }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}