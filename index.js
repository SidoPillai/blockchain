/*##########################
##     CONFIGURATION      ##
##########################*/

//  -- Step 1: Set up the appropriate configuration
var Web3 = require("web3")
var EthereumTransaction = require("ethereumjs-tx")
var web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction.
var sendingAddress = '0x26c3e0D9EA4d1c07EC131e18Da998ceC4A7a2E72'
var receivingAddress = '0x9D4b50f48A7d0Cc27c2A807f55334860617B3eE2'

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
##  CREATE A TRANSACTION  ##
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
var rawTransaction = {
    nonce: 1,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 100,
    data: ""
}

// -- Step 5: View the raw transaction
rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
##  Sign the Transaction  ##
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
var privateKeySender = '19989c444783408e7efa90541620b1a5859bacc330e743509c3c4196b840e3a6'
var privateKeySenderHex = new Buffer(privateKeySender, 'hex')
var transaction = new EthereumTransaction(rawTransaction)
transaction.sign(privateKeySenderHex)

/*#########################################
##  Send the transaction to the network  ##
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
// web3.eth.sendSignedTransaction(serializedTransaction);

// web3.eth.getGasPrice().then(console.log);

web3.eth.getUncle(500, 0).then(console.log);

web3.eth.getBlockTransactionCount("0x26c3e0D9EA4d1c07EC131e18Da998ceC4A7a2E72").then(console.log);