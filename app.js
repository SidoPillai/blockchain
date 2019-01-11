var bitcoin = require('bitcoinjs-lib') // v3.x.x
var bitcoinMessage = require('bitcoinjs-message')

var keyPair = bitcoin.ECPair.fromWIF('5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss')

// var privateKey = keyPair.d.toBuffer(32)

var privateKey = keyPair.privateKey

var message = 'This is an example of a signed message.'
 
var signature = bitcoinMessage.sign(message, privateKey, keyPair.compressed)
console.log(signature.toString('base64'))
