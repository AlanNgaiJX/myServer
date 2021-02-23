const User = require("../model/User.js");
const { encodePwd, verifyPwd } = require("../utils/password.js");
function getUserByPhone(phone) {
    return User.findOne({
        phone,
    });
}

async function registUser(phone, password) {
    password = await encodePwd(password);
    return new User({
        phone,
        password,
    }).save();
}

module.exports = exports = {
    getUserByPhone,
    registUser,
};
