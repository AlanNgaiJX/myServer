const expressJwt = require("express-jwt");
const config = require("../config/index.js");
const multer = require("multer");
const path = require("path");

// jwt验证中间件
const jwtAuth = expressJwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
});

// 捕获token验证失败中间件
function catchJwtAuth(err, req, res, next) {
    // 捕获token验证失败
    if (err.name === "UnauthorizedError") {
        res.json({
            code: 99,
            msg: "未登录",
        });
    }
}

// multer上传中间件
const uploader = multer({
    dest: path.join(process.cwd(), "public/temp"),
});

// multer formdata上传中间件
const formDataParse = multer({
    dest: path.join(process.cwd(), "public/temp"),
}).none();

module.exports = exports = {
    jwtAuth,
    catchJwtAuth,
    uploader,
    formDataParse,
};
