const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const logger = require("morgan");
const FileStreamRotator = require("file-stream-rotator");
const config = require("./config/index.js");
const routes = require("./routes/index.js");
const app = express();

// uncaughtException全局捕获未捕获的Error，
// 同时将此函数的调用栈打印出来，捕获之后可以有效防止node进程退出
process.on("uncaughtException", function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

//设置日志文件目录
const logDirectory = __dirname + "/logs";
//确保日志文件目录存在 没有则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//创建一个写路由
const accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + "/accss-%DATE%.log",
    frequency: "daily",
    verbose: false,
});

app.use(logger("combined", { stream: accessLogStream })); //写入日志文件

// 设置跨域
app.use(
    express.static(path.join(__dirname, "public"), {
        setHeaders: function (res, path, stat) {
            res.set("Access-Control-Allow-Origin", "*");
        },
    })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 路由
routes(app);

app.listen(config.port, function () {
    console.log(`${config.appName} is server on ${config.host}:${config.port}`);
});
