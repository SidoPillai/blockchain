# Blockchain Webservice

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

This project has 2 endpoints. I prefer using Postman for testing these endpoints. You may choose to use Curl


1. GET - http://localhost:8000/block/{blockHeight}

blockHeight - integer value of a particular height

### Example 1 - Success Case

http://localhost:8000/block/0

Expected Response
```
{
    "hash": "da915752482d95cd854615c7d60c5ecd80442f8637ab3cb5b82062c55e7d7318",
    "height": 0,
    "body": "First block in the chain - Genesis block",
    "time": "1549923435",
    "previousBlockHash": ""
}
```

### Example 2 - Failure Case

http://localhost:8000/block/blah

Expected Response
```
Block not found at height blah
```

2. POST - http://localhost:8000/block

set body as

```
{
      "body": "Some data"
}
```

### Example 1 - Success Case

Expected Response
```
{"hash":"dc3a799c6487a20c677b01c263b9a9c7e48c3738a4e3e4aca4efa61628e0f001","height":5,"body":"Some data","time":"1549929003","previousBlockHash":"3f876c548c243619e81179b77216fbc1c40d2e669f64fc731d0458c58f181864"}
```

### Example 2 - Failure Case
With no body

Expected Response
```
Invalid request! Please refer README.md for sending request
```

## Built With

* [Node.js](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Express.js](https://expressjs.com/) - The package express is the most important package because it allows you to use features of the Express Framework to create your RESTful API
* [Crypto.js](https://www.npmjs.com/package/crypto-js) - This is used to create SHA-256 hash of block data
* [LevelDB](https://www.npmjs.com/package/level) - This is used to store BlockChain data
* [BodyParser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware 


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
