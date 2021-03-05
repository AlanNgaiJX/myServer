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
        userInfo: {
            nickName: "user-" + phone.slice(-4),
        },
    }).save();
}

function getInfoByUserId(userId) {
    return User.findOne({
        _id: userId,
    });
}

function updateUserInfo(
    userId,
    nickName,
    gender,
    intro,
    avatar,
    background,
    city
) {
    return User.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            userInfo: {
                nickName,
                gender,
                intro,
                avatar,
                background,
                city,
                status: 1,
            },
        }
    );
}

function updateUserPartIn(userId,participateIn) {
    return User.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            participateIn,
        }
    );
}

function getUserById(userId) {
    return User.findById(userId);
}

module.exports = exports = {
    getUserByPhone,
    registUser,
    getInfoByUserId,
    updateUserInfo,
    getUserById,
    updateUserPartIn
};
