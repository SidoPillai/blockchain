/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;        
        return new Promise(function(resolve, reject) {
            self.db.get(key, (err, value) => {
                if(err) {
                    if (err.type == 'NotFoundError') {
                        resolve(undefined);
                    } else {
                        console.log('Block ' + key + ' get failed', err);
                        reject(err);
                    }
                } else {
                    // console.log("getLEVELDBDATA", JSON.stringify(value).toString())
                    resolve(value);
                }
            });
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            self.db.put(key, value, function(err) {
                if (err) {
                    console.log('Block ' + key + 'submission failed', err);
                    reject(err);
                }
                resolve(value);
            })
        });
    }

    // Method that return the height
    getBlocksCount() {
        // console.log('getBlocksCount()')
        let self = this;
        return new Promise(function(resolve, reject) {
            var count = 0;
            self.db.createReadStream()
            .on('data', function (data) {
                // console.log('key=',data.key)          
                count++;
            })
            .on('error', function(data) {
                reject('No blocks found')
            })
            .on('close', function(data) {
                // console.log('final count ', count)
                resolve(count);
            });
        });
    }
        

}

module.exports.LevelSandbox = LevelSandbox;