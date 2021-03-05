const Blog = require("../model/Blog.js");

function createBlog(groupId, userId, blogContent, blogImages) {
    return new Blog({
        groupId,
        blogAuthor: userId,
        blogContent,
        blogImages,
    }).save();
}

function pushComment(blogId, commentId) {
    return Blog.update(
        {
            _id: blogId,
        },
        {
            $addToSet: {
                comments: commentId,
            },
        }
    );
}

function getAllBlogsByUserId(userId) {
    return Blog.find({
        blogAuthor: userId,
    })
        .populate([
            "blogImages",
            "blogAuthor",
            {
                path: "comments",
                populate: ["commentAuthor"],
            },
        ])
        .sort({
            createdAt: -1,
        });
}

module.exports = exports = { createBlog, pushComment, getAllBlogsByUserId };
