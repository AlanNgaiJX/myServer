const express = require("express");
const fs = require("fs");
const path = require("path");
const { formDataParse } = require("../utils/middlewares.js");
const {
    getPhotoByUidMd5,
    getPhotosByUid,
    savePhoto,
} = require("../controler/photo.js");
const { uploader } = require("../utils/middlewares.js");
const { parsePhoto } = require("../utils/photo.js");
const router = express.Router();

router.post("/getPhotoByMd5", formDataParse, async function (req, res) {
    const userId = req.body.userId;
    const md5 = req.body.md5;
    try {
        const exisitPhoto = await getPhotoByUidMd5(userId, md5);

        if (exisitPhoto) {
            res.json({
                code: 200,
                data: parsePhoto(exisitPhoto),
            });
        } else {
            res.json({
                code: 200,
                data: null,
            });
        }
    } catch (err) {
        res.json({
            code: 500,
            msg: "未知错误",
        });
    }
});

router.post("/getPhotosByUid", async function (req, res) {
    const userId = req.body.userId;

    if (!userId) {
        res.json({
            code: 500,
            msg: "参数错误",
        });
        return;
    }

    try {
        const photos = await getPhotosByUid(userId);
        res.json({
            code: 200,
            data: photos.map((photoModelObj) => parsePhoto(photoModelObj)),
        });
    } catch (error) {
        res.json({
            code: 500,
            msg: "未知错误",
        });
    }
});

router.post("/uploadPhoto", uploader.single("file"), async function (req, res) {
    const file = req.file;
    const { src, md5, userId, width, height, exif } = req.body;
    const tempPath = file.path;
    const targetPath = path.join(process.cwd(), "public", src);
    const userFolder = path.dirname(targetPath);

    function checkFolder() {
        return new Promise((resolve, reject) => {
            try {
                fs.accessSync(userFolder);
                resolve(true);
            } catch (error) {
                try {
                    fs.mkdirSync(userFolder);
                } catch (err) {
                    reject(err);
                }
                resolve(true);
            }
        });
    }

    try {
        // 保证存在用户文件夹
        await checkFolder();
        // 转移临时文件到用户文件夹
        await fs.promises.rename(tempPath, targetPath);
        // 插入数据库记录
        const success = await savePhoto(userId, md5, src, exif, width, height);

        function parseExif(exifStr) {
            const reg = /([\w]+):([\w\s]*);/g;
            const result = {};
            for (const item of exifStr.matchAll(reg)) {
                const key = item[1];
                const value = item[2];
                result[key] = value;
            }
            return result;
        }

        res.json({
            code: 200,
            data: { photo: parsePhoto(success), md5 },
            msg: "上传成功",
        });
    } catch (error) {
        console.log(error);
        res.json({
            code: 99,
            data: { md5 },
            msg: "上传失败",
        });
    }
});
module.exports = exports = router;
