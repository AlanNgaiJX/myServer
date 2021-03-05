const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;

const BlogSchema = Schema(
    {
        // 所属群组
        groupId: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "group",
        },

        // 博客作者
        blogAuthor: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },

        // 博客内容
        blogContent: {
            type: String,
            require: true,
        },

        // 博客贴图
        blogImages: [
            {
                type: Schema.Types.ObjectId,
                require: true,
                ref: "photo",
            },
        ],

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
        comments: [
            {
                type: Schema.Types.ObjectId,
                require: true,
                ref: "comment",
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

const Blog = mongoose.model("blog", BlogSchema, "blogs");

module.exports = exports = Blog;
