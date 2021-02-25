const mongoose = require("../db/index.js");

/* 群成员 */
const GroupMemberSchema = mongoose.Schema(
    {
        // 用户id
        userId: {
            type: String,
            require: true,
        },

        // 角色
        role: {
            type: Number,
            enum: [1, 2], // [1:群管理员，2:普通群员]
            require: true,
        },

        // 积分
        credits: {
            type: Number,
            default: 0,
            require: true,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

/* 群分享评论 */
const commentSchema = mongoose.Schema(
    {
        // 评论作者
        commentAuthor: { type: String, require: true },

        // 评论内容
        commentContent: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

/* 群分享 */
const GroupBlogSchema = mongoose.Schema(
    {
        // 博客作者
        blogAuthor: {
            type: String,
            require: true,
        },

        // 博客内容
        blogContent: {
            type: String,
            require: true,
        },

        // 博客贴图
        blogImages: [String],

        // 博客状态
        blogStatus: {
            type: Number,
            enum: [1, 2], // [1:可见, 2:被隐藏]
            default: 1,
            require: true,
        },

        // 博客点赞数
        likes: {
            type: Number,
            min: 0,
            default: 0,
            require: true,
        },

        // 博客评论
        comments: [commentSchema],
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

/* 群组 */
const GroupSchema = mongoose.Schema(
    {
        // 群组名称
        groupName: {
            type: String,
            match: /^.{20}$/,
            require: true,
        },

        // 群组索引
        groupIndex: {
            type: String,
            match: /^.{20}$/,
            require: true,
        },

        // 群组密码（私人群组使用）
        groupPassword: {
            type: String,
            match: /^.{60}$/,
        },

        // 群组类别
        groupType: {
            type: Number,
            enum: [1, 2], // [1:私人群组, 2:公开群组]
            default: 1,
            require: true,
        },

        groupIntro: {
            type: String,
            match: /^.{0,500}$/,
            require: true,
        },

        // 群主
        groupOwner: {
            type: String,
            require: true,
        },

        // 群成员
        groupMembers: [GroupMemberSchema],

        // 群分享
        GroupBlogs: [GroupBlogSchema],
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
