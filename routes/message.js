const express = require("express");
const router = express.Router();
const {
    getAllMessageByUserId,
    updateMessageReaded,
    updateMessageHided,
} = require("../controler/message.js");
const { jwtAuth, catchJwtAuth } = require("../utils/middlewares.js");

/* 获取用户所有消息 */
router.post(
    "/getAllMessageByUserId",
    jwtAuth,
    catchJwtAuth,
    function (req, res) {
        const { userId } = req.body;
        getAllMessageByUserId(userId)
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
    }
);

router.post("/setMessageReaded", jwtAuth, catchJwtAuth, function (req, res) {
    const { messageId } = req.body;
    updateMessageReaded(messageId)
        .then((result) => {
            res.json({
                code: 200,
            });
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

router.post("/delMessage", jwtAuth, catchJwtAuth, function (req, res) {
    const { messageId } = req.body;
    updateMessageHided(messageId)
        .then((result) => {
            res.json({
                code: 200,
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
