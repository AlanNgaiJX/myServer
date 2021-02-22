const express = require("express");
const config = require("./config/index.js");
const router = require("./router/index.js");
const app = express();

app.use("/", router);

app.listen(config.port, function () {
    console.log(`${config.appName} is server on ${config.host}:${config.port}`);
});
