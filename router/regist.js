const { getKeygen } = require("../controler/key.js");
const crypto = require("crypto");

module.exports = exports = {
    install(router) {
        router.get("/", function (req, res) {
            res.end("????");
        });

        router.post("/getPublicKey", function (req, res) {
            getKeygen().then((result) => {
                res.json({
                    code: 200,
                    publicKey: result.publicKey,
                    privateKey: result.privateKey,
                });
            });
        });

        router.post("/regist", function (req, res) {
            const { phone: encodePhone, password: encodePwd } = req.body;

            function decrypt(privateKey, str) {
                return crypto
                    .privateDecrypt(privateKey, Buffer.from(str, "hex"))
                    .toString();
            }

            getKeygen().then(({ privateKey }) => {
                const dePhone = decrypt(privateKey, encodePhone);
                const dePwd = decrypt(privateKey, encodePwd);
                console.log(dePhone, dePwd);
            });
            res.end("????");
        });
    },
};
