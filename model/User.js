const mongoose = require("../db/index.js");

const UserInfoSchema = mongoose.Schema({
    // 用户昵称
    nickName: {
        type: String,
        maxLength: 20,
        default: "Guest_2021",
    },

    // 用户性别
    gender: {
        type: Number,
        enum: [0, 1, 2], // [0：未知，1：男，2：女]
        default: 0,
    },

    // 用户身高
    height: {
        type: Number,
        min: -1,
        max: 250,
        default: 0,
    },

    // 用户体重
    weight: {
        type: Number,
        min: -1,
        max: 250,
        default: 0,
    },

    // 用户所在城市
    city: {
        type: String,
        default: "",
    },
});

const UserSchema = mongoose.Schema(
    {
        // 手机号
        phone: {
            type: String,
            match: /^1\d{10}$/,
            required: true,
        },
        // 密码
        password: {
            type: String,
            match: /^.{60}$/,
            required: true,
        },

        // 用户状态
        userStatus: {
            type: Number,
            enum: [1, 99], // [1：已注册，99：已注销]
            default: 1,
            required: true,
        },

        userRole: {
            type: Number,
            enum: [1, 2], // [1：普通用户，2：超级用户]
            default: 1,
            required: true,
        },

        userInfo: [UserInfoSchema],
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const User = mongoose.model("user", UserSchema, "users");

module.exports = exports = User;
