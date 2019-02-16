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
                        reject(err);
                    }
                } else {
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
                    reject(err);
                }
                resolve(value);
            })
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        return new Promise(function(resolve, reject) {
            var count = 0;
            self.db.createReadStream()
            .on('data', function (data) {
                count++;
            })
            .on('error', function(data) {
                reject('No blocks found')
            })
            .on('close', function(data) {
                resolve(count);
            });
        });
    }        
}

module.exports.LevelSandbox = LevelSandbox;