const bcrypt = require("bcrypt");

function encodePwd(pwdStr) {
    return bcrypt.hash(pwdStr, 15);
}

function verifyPwd(pwd, hash){
    return bcrypt.compare(pwd, hash);
}

module.exports = exports = {
    encodePwd,
    verifyPwd
}
