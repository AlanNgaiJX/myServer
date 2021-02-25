const express = require("express");
const router = express.Router();
const JWT = require("../utils/jwt.js");
const { jwtAuth, catchJwtAuth } = require("../utils/middlewares.js");

router.get("/", function (req, res) {
    res.end("ok");
});

router.post("/jwtAuth", jwtAuth, catchJwtAuth, function (req, res) {
    res.json(req.user);
});

router.post("/getToken", function (req, res) {
    const token = JWT.generate({
        _id: "123",
        role: "admin",
    });
    if (token) {
        res.cookie("token", token, { maxAge: 900000 });
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
