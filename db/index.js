const mongoose = require("mongoose");
mongoose
    .connect("mongodb://devGroupup:123456@localhost:27017/groupupdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("连接数据库成功!!!");
    })
    .catch((error) => {
        console.log("连接数据库失败", error);
    });

module.exports = exports = mongoose;
