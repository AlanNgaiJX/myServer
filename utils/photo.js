// photo对象为
/* photo对象为:
{
    md5,
    src,
    shootTime,
    orientation,
    width,
    height,
}
*/
function parsePhoto(model) {
    const { md5, src, exif, width, height } = model;

    return {
        md5,
        src,
        shootTime: parseExif(exif).shootTime || "",
        orientation: parseExif(exif).orientation || 0,
        width,
        height,
    };
}

// 从exif字段解析出exif信息
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

module.exports = exports = {
    parsePhoto,
};
