const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;
const User = require("./User.js");
const Blog = require("./Blog.js");

/* 群组 */
const GroupSchema = Schema(
    {
        // 群主的 userId
        groupOwner: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },

        // 群组名称
        groupName: {
            type: String,
            match: /^.{0,20}$/,
            require: true,
        },

        // 群组简介
        groupIntro: {
            type: String,
            match: /^.{0,500}$/,
            require: true,
        },

        // 群组类别
        groupType: {
            type: Number,
            enum: [1, 2], // [1:私人群组, 2:公开群组]
            default: 2,
            require: true,
        },

        // 群组密码（私人群组使用）
        groupPassword: {
            type: String,
            match: /^.{60}$/,
        },

        // 群组位置
        groupLocation: {
            type: String,
            default: "不限",
            require: true,
        },

        // 群组封面
        groupCover: {
            type: String,
            default:
                "groupup/6034d4e40bbc981be298f6f4/02e9775c-70bf-7692-8f06-5e025ad95ce9.jpg",
            require: true,
        },

        // 群成员
        groupMembers: [
            {
                type: Schema.Types.ObjectId,
                require: true,
                ref: "user",
            },
        ],

        // 群分享
        groupBlogs: [
            {
                type: Schema.Types.ObjectId,
                require: true,
                ref: "blog",
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

const Group = mongoose.model("group", GroupSchema, "groups");

module.exports = exports = Group;
