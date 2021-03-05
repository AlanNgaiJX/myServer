const express = require("express");
const router = express.Router();
const { jwtAuth, catchJwtAuth } = require("../utils/middlewares.js");
const { pushGroupBlog } = require("../controler/group.js");

const {
    createBlog,
    pushComment,
    getAllBlogsByUserId,
} = require("../controler/blog.js");

const { createComment } = require("../controler/comment.js");

/* 发表群组分享 */
router.post("/createBlog", jwtAuth, catchJwtAuth, async function (req, res) {
    const { groupId, userId, blogContent, blogImages } = req.body;
    try {
        const blog = await createBlog(groupId, userId, blogContent, blogImages);
        const result = await pushGroupBlog(groupId, blog.id);
        console.warn(result,"!!!!!!!");
        res.json({
            code: 200,
            data: blog,
        });
    } catch (error) {
        res.json({
            code: 500,
            msg: "未知错误",
        });
    }
});

/* 发表评论 */
router.post("/createComment", jwtAuth, catchJwtAuth, function (req, res) {
    const { userId, blogId, commentContent } = req.body;
    createComment(userId, blogId, commentContent)
        .then(async (result) => {
            await pushComment(blogId, result.id);
            result.populate("commentAuthor", function () {
                res.json({
                    code: 200,
                    data: result,
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

/* 获取用户的所有群组分析 */
router.post("/getAllBlogsByUserId", jwtAuth, catchJwtAuth, function (req, res) {
    const { userId } = req.body;
    getAllBlogsByUserId(userId)
        .then((result) => {
            res.json({
                code: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

module.exports = exports = router;
