const express = require("express");
const router = express.Router();
const JWT = require("../utils/jwt.js");
const { jwtAuth } = require("../utils/middlewares.js");

router.get("/", function (req, res) {
    res.end("ok");
});

router.get("/a", jwtAuth, function (req, res) {
    console.log(req.user);
    res.end("ok");
});

router.post("/test", function (req, res) {
    const token = JWT.generate({
        _id: "123",
        role: "admin",
    });
    if (token) {
        res.json({
            status: "ok",
            code: 200,
            data: {
                token,
            },
        });
    } else {
        res.json({
            status: "err",
            code: 500,
            msg: "generate token fail",
        });
    }
});

module.exports = exports = router;
