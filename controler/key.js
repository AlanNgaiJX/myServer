const Key = require("../model/Key.js");

const keyCache = {};

function getKeygen() {
    return new Promise((resolve, reject) => {
        if (keyCache.publicKey && keyCache.privateKey) {
            resolve(keyCache);
        } else {
            Key.findOne({
                _id: "601d6bf05e45cd4e17c7c08a",
            })
                .then((res) => {
                    keyCache.publicKey = res.publicKey;
                    keyCache.privateKey = res.privateKey;
                    resolve(keyCache);
                })
                .catch((err) => {
                    reject(err);
                });
        }
    });
}

module.exports = exports = { keyCache, getKeygen };
