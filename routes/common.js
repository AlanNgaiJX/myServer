const express = require("express");
const path = require("path");
const fs = require("fs");
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const { getKeygen } = require("../controler/key.js");
const { getInfoByUserId, updateUserInfo } = require("../controler/user.js");
const { uploader } = require("../utils/middlewares.js");
const router = express.Router();
const { jwtAuth, catchJwtAuth } = require("../utils/middlewares.js");

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
router.post("/uploadImg", uploader.single("file"), async function (req, res) {
    const file = req.file;
    const extname = path.extname(file.originalname);
    const filepath = file.path;
    const targetFilepath = filepath + extname;

    console.log(file);
    fs.renameSync(filepath, filepath + extname)
    // imagemin([filepath+extname], {
    //     destination: path.join(process.cwd(), "public/compress"),
    //     plugins:[
    //         imageminMozjpeg({
    //             quality: 30
    //         }),
    //         imageminPngquant({
    //             quality: [0.2,0.4]
    //         })
    //     ]
    // }).then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })
    // fs.promises
    //     .rename(filepath, targetFilepath)
    //     .then(() => {
    //         console.log("上传成功");
    //         res.end("上传成功");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});

router.post("/getInfoByUserId", jwtAuth, catchJwtAuth, function (req, res) {
    const { userId } = req.body;
    if (!userId) {
        res.json({
            code: 500,
            msg: "参数错误",
        });
        return;
    }
    getInfoByUserId(userId)
        .then((result) => {
            res.json({
                code: 200,
                data: result.userInfo,
            });
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

router.post("/updateUserInfo", jwtAuth, catchJwtAuth, function (req, res) {
    const {
        userId,
        avatar,
        background,
        city,
        gender,
        intro,
        nickName,
    } = req.body;

    if (
        !userId ||
        avatar === undefined ||
        !background ||
        !city ||
        gender === undefined ||
        !intro ||
        !nickName
    ) {
        res.json({
            code: 500,
            msg: "参数错误",
        });
        return;
    }

    updateUserInfo(userId, nickName, gender, intro, avatar, background, city)
        .then((result) => {
            res.json({
                code: 200,
                msg: "更改成功",
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

module.exports = exports = router;
