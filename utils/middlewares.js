const expressJwt = require("express-jwt");
const config = require("../config/index.js");

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

module.exports = exports = {
    jwtAuth,
    catchJwtAuth,
};
