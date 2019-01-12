// require the module
const be = require('blockexplorer')


function getBlock(index) {
    //Add your code here
    // Start by requesting the hash
    // Then request the block and use console.log

    // get the genesis block hash
    be.blockIndex(index)
        .then((result) => {
            console.log("result", JSON.parse(result).blockHash);
            // return Promise.resolve(be.block(JSON.parse(result).blockHash));
            // console.log("result", JSON.parse(result).blockHash);
            be.block(JSON.parse(result).blockHash).then((data) => {
                console.log("data ", data);
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            throw err;
        })
}

(function theLoop (i) {
	setTimeout(function () {
        getBlock(i);
        i++;
		if (i < 3) theLoop(i);
	}, 3600);
  })(0);



