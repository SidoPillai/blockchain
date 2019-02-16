# Private Blockchain Notary Service

Connect Private Blockchain to Front-End Client via APIs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Download NodeJS from https://nodejs.org/en/
```
$node --version
```
will return the version of the node installation to validate that node has installed correctly on your machine.
This is needed to run the project. 

2. Download Postman from https://www.getpostman.com/downloads/
This will help you to test and validate endpoints.

### Installing

1. Extract the project to your machine
2. Open the terminal and install the packages ```npm install```
3. To run the application ```node app.js```
4. Test the endpoints using Postman

## Testing the project

This project has 6 endpoints. I prefer using Postman for testing these endpoints. You can use Curl as well.

## 1. POST - http://localhost:8000/requestValidation 

Add the wallet address to the mempool with a 300 second time out. 

The request should contain the following in body:
```
{ 
    "address":"136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo" 
}
```

Expected response:
```
{
    "walletAddress": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
    "requestTimeStamp": "1550280803",
    "message": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo:1550280803:starRegistry",
    "validationWindow": 300
}
```

## 2. POST - http://localhost:8000/message-signature/validate 

Validate the signature, message and the address. It first checks whether the address is available in the mempool.
If it is valid it will be removed from the mempool.

The request should contain the following in body:
```
{
    "address":"136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
    "signature":"HwZLfLkxrfx4Y079MijwztYJ/rJ609jTu9U3Js+iveIyUA7tXzgcslZJtT+PC00i/vDnrAe4KrWZX6KmXWEeLGI="
}
```

Expected response:
```
{
    "registerStar": true,
    "status": {
        "address": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
        "requestTimeStamp": "1550280803",
        "message": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo:1550280803:starRegistry",
        "validationWindow": 225,
        "messageSignature": true
    }
}
```

## 3. POST - http://localhost:8000/block 

Add block to the blockchain. Underthehood, it checks whether the address is validated address, 
checks whether the input is of the right format.

The request should contain:
```
{
    "address": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
    "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "https://www.google.com/sky/"
            }
}
```

Expected response:
```
{
    "hash": "aa289a05c9fd1f90a772a8e414c8b955182e14d00ec21ee6ac246bd77f21f462",
    "height": 21,
    "body": {
        "address": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "68747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
        }
    },
    "time": "1550280906",
    "previousBlockHash": "1982e0c0b56f31735dfe8e12de0cf10b858a161387be8f6eea86cdd954b26efd"
}
```

## 4. GET - http://localhost:8000/stars/hash:[HASH] 

Retrieve the block by hash.

For e.g. to retrieve the above block 
GET 
```
http://localhost:8000/stars/hashaa289a05c9fd1f90a772a8e414c8b955182e14d00ec21ee6ac246bd77f21f462
```

Expected response:
```
{
    "hash": "aa289a05c9fd1f90a772a8e414c8b955182e14d00ec21ee6ac246bd77f21f462",
    "height": 21,
    "body": {
        "address": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "68747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
            "storyDecoded": "https://www.google.com/sky/"
        }
    },
    "time": "1550280906",
    "previousBlockHash": "1982e0c0b56f31735dfe8e12de0cf10b858a161387be8f6eea86cdd954b26efd"
}
```

## 5. GET - http://localhost:8000/stars/address:[ADDRESS] 

Retrieve the block by wallet address

For e.g. to retrieve the above block

GET
```
http://localhost:8000/stars/address136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo
```

Expected response:
```
[
    {
        "hash": "aa289a05c9fd1f90a772a8e414c8b955182e14d00ec21ee6ac246bd77f21f462",
        "height": 1,
        "body": {
            "address": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
            "star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "68747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
                "storyDecoded": "https://www.google.com/sky/"
            }
        },
        "time": "1550280906",
        "previousBlockHash": "97a09ac015fbccb7b48022af412118bc985540d1144f42add96598b99bfc3c57"
    }
]
```

## 6. GET - http://localhost:8000/block/[HEIGHT] 

Retieve the block by height

For e.g. to retieve the above block

GET
```
http://localhost:8000/block/1
```

Expected response:
```
{
    "hash": "aa289a05c9fd1f90a772a8e414c8b955182e14d00ec21ee6ac246bd77f21f462",
    "height": 21,
    "body": {
        "address": "136o12dADFQ3f6Tbb96d5o35NJiUZ7AuAo",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "68747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
        }
    },
    "time": "1550280906",
    "previousBlockHash": "97a09ac015fbccb7b48022af412118bc985540d1144f42add96598b99bfc3c57"
}
```

## Built With

* [Node.js](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Express.js](https://expressjs.com/) - The package express is the most important package because it allows you to use features of the Express Framework to create your RESTful API
* [Crypto.js](https://www.npmjs.com/package/crypto-js) - This is used to create SHA-256 hash of block data
* [LevelDB](https://www.npmjs.com/package/level) - This is used to store BlockChain data
* [BodyParser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware 
* [Hex2ASCII](https://www.npmjs.com/package/hex2ascii) - Utility lib to convert hexadecimal value to ASCII

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/siddeshpillai/3b2f8c6ddaef220a1a27d7891217ff48) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* [Siddesh Pillai](https://github.com/siddeshpillai)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Udacity Blockchain Developer Nanodegree