const exifStr1 = "orientation:;shootTime:;";

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

console.log(parseExif(exifStr1));