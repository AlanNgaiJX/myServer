const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/index.js");
const secret = config.jwtSecret;

class JWT {
    static generate(payload, expires = "7 days") {
        // payload 为传入值， expires为过期时间，这两者都会在token字符串中
        try {
            return jsonwebtoken.sign(payload, secret, { expiresIn: expires });
        } catch (e) {
            console.error("jwt sign error --->", e);
            return "";
        }
    }

    static verify(token) {
        try {
            return jsonwebtoken.verify(token, secret); // 如果过期将返回false
        } catch (e) {
            console.error("jwt verify error --->", e);
            return false;
        }
    }
}

module.exports = exports = JWT;