const express = require("express");
const path = require("path");
const fs = require("fs");
const { getKeygen } = require("../controler/key.js");
const { uploader } = require("../utils/middlewares.js");
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

/* 上传图片 */
router.post("/uploadImg", uploader.single("file"), function (req, res) {
    const file = req.file;
    const extname = path.extname(file.originalname);
    const filepath = file.path;
    const targetFilepath = filepath + extname;

    fs.promises
        .rename(filepath, targetFilepath)
        .then(() => {
            console.log("上传成功");
            res.end("上传成功");
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = exports = router;
