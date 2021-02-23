const express = require("express");
const {getKeygen} = require("../controler/key.js");
const router = express.Router();

/* 获取公钥 */
router.post("/getPublicKey", function (req, res) {
    getKeygen().then((result) => {
        res.json({
            code: 200,
            publicKey: result.publicKey,
            privateKey: result.privateKey,
        });
    });
});

module.exports = exports = router;