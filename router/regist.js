const { getKeygen } = require("../controler/key.js");
const { getUserByPhone, registUser } = require("../controler/user.js");
const { decrypt } = require("../utils/password.js");

module.exports = exports = {
    install(router) {
        router.get("/", function (req, res) {
            res.end("????");
        });

        /* 获取公钥 */
        router.post("/getPublicKey", function (req, res) {
            getKeygen().then((result) => {
                res.json({
                    code: 200,
                    publicKey: result.publicKey,
                    privateKey: result.privateKey,
                });
            });
        });

        /* 注册 */
        router.post("/regist", async function (req, res) {
            const { phone: encodePhone, password: encodePwd } = req.body;

            if (!encodePhone || !encodePwd) {
                res.json({
                    code: 500,
                    msg: "参数错误",
                });
                return;
            }

            try {
                const { privateKey } = await getKeygen();
                const dePhone = decrypt(privateKey, encodePhone);
                const dePwd = decrypt(privateKey, encodePwd);
                const isExist = await getUserByPhone(dePhone);

                if (isExist) {
                    res.json({
                        code: 99,
                        msg: "用户已存在",
                    });
                } else {
                    const registResult = await registUser(dePhone, dePwd);
                    if (registResult) {
                        res.json({
                            code: 200,
                            msg: "注册成功",
                        });
                    }
                }
            } catch (error) {
                res.json({
                    code: 500,
                    msg: "未知错误",
                });
            }
        });

        router.post("/test", async function (req, res) {
            const { phone } = req.body;
            const a = await getUserByPhone(phone);
            console.log(a);
            res.json({ phone });
        });
    },
};
