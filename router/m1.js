const { getKeygen } = require("../controler/key.js");

module.exports = exports = {
    install(router) {
        router.get("/", function (req, res) {
            res.end("????");
        });

        router.post("/getPublicKey", function (req, res) {
            getKeygen().then(result=>{
                res.end(result.publicKey);
            })
        });

        router.post("/regist", function (req, res) {
            res.end("????");
        });
    },
};
