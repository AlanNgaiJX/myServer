const Comment = require("../model/Comment.js");

function createComment(userId, blogId, commentContent) {
    return new Comment({
        commentAuthor: userId,
        commentBlog: blogId,
        commentContent: commentContent,
    }).save();
}

module.exports = exports = { createComment };
