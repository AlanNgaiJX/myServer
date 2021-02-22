const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/index.js");
const router = require("./router/index.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

app.listen(config.port, function () {
    console.log(`${config.appName} is server on ${config.host}:${config.port}`);
});
