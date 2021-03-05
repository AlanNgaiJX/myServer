const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;

/* 群分享评论 */
const CommentSchema = Schema(
    {
        // 评论作者
        commentAuthor: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },

        commentBlog: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "blog",
        },

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

const Comment = mongoose.model("comment", CommentSchema, "comments");

module.exports = exports = Comment;
