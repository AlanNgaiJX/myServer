const JWT = require("../utils/jwt.js");

/* 测试用例 */
const payload = {
    uuid: "3455445-acuya7skeasd-iue7",
    phone: 133409899625,
};
const token = JWT.generate(payload);
console.log(token);
// const info = JWT.verify(token);
// console.log(info);
// setTimeout(() => {
//     console.log("检验过期token");
//     const info2 = JWT.verify(token);
//     console.log(info2); // false
// }, 13000);
