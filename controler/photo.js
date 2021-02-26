const Photo = require("../model/Photo.js");

function getPhotoByUidMd5(userId, md5) {
    return Photo.findOne({
        userId,
        md5,
    });
}

function getPhotosByUid(userId) {
    return Photo.find({
        userId,
    });
}

function savePhoto(userId, md5, src, exif, width, height) {
    return new Photo({
        userId,
        md5,
        src,
        exif,
        width,
        height,
    }).save();
}

module.exports = exports = {
    getPhotoByUidMd5,
    getPhotosByUid,
    savePhoto
};
