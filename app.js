var Web3 = require("web3")
var EthereumTransaction = require("ethereumjs-tx")
var web3 = new Web3('HTTP://127.0.0.1:7545')

var address = '0x26c3e0D9EA4d1c07EC131e18Da998ceC4A7a2E72'

web3.eth.getBalance(address).then(console.log)
web3.eth.getTransactionCount(address).then(console.log)