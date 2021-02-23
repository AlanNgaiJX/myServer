const bcrypt = require("bcrypt");
const crypto = require("crypto");

/* 加密密码 */
function encodePwd(pwdStr) {
    return bcrypt.hash(pwdStr, 15);
}

/* 验证密码 */
function verifyPwd(pwd, hash){
    return bcrypt.compare(pwd, hash);
}

/* 私钥解密 */
function decrypt(privateKey, str) {
    return crypto
        .privateDecrypt(privateKey, Buffer.from(str, "hex"))
        .toString();
}

module.exports = exports = {
    encodePwd,
    verifyPwd,
    decrypt
}
