const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;
const UserInfoSchema = Schema({
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

    // 用户介绍
    intro: {
        type: String,
        maxLength: 100,
        default: "介绍下自己",
    },

    // 用户头像
    avatar: {
        type: Number,
        default: 0,
        min: 0,
        max: 30,
    },

    // 背景墙
    background: {
        type: String,
        default: "rgb(135,0,255)",
    },

    // 用户所在城市
    city: {
        type: String,
        default: "广州市",
    },

    // 状态
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2], // [0：初始，1：更改但未完善，2：已完善]
    },
});

const UserSchema = Schema(
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

        userInfo: UserInfoSchema,

        participateIn: [
            {
                type: Schema.Types.ObjectId,
                require: true,
                ref: "group",
            },
        ],
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
