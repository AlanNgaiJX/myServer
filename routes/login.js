const express = require("express");
const router = express.Router();
const { getKeygen } = require("../controler/key.js");
const { getUserByPhone } = require("../controler/user.js");
const { decrypt, verifyPwd } = require("../utils/password.js");
const JWT = require("../utils/jwt.js");

/* 登录 */
router.post("/loginByPwd", async function (req, res) {
    const { phone: encodePhone, password: encodePwd, debug } = req.body;
    if (!encodePhone || !encodePwd) {
        res.json({
            code: 500,
            msg: "参数错误",
        });
        return;
    }

    try {
        const { privateKey } = await getKeygen();
        const dePhone = debug ? encodePhone : decrypt(privateKey, encodePhone);
        const dePwd = debug ? encodePwd : decrypt(privateKey, encodePwd);
        const user = await getUserByPhone(dePhone);
        if (user === null) {
            res.json({
                code: 99,
                msg: "用户不存在",
            });
        } else {
            const verifyResult = await verifyPwd(dePwd, user.password);
            if (verifyResult) {
                const token = JWT.generate({
                    phone: user.phone,
                    userRole: user.userRole,
                });
                res.cookie("token", token, { maxAge: 900000 });
                res.json({
                    code: 200,
                    msg: "登录成功",
                });
            } else {
                res.json({
                    code: 99,
                    msg: "登录失败，密码错误",
                });
            }
        }
    } catch (error) {
        console.warn(error);
        res.json({
            code: 500,
            msg: "未知错误",
        });
    }
});

module.exports = exports = router;
