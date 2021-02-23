const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/index.js");
const routes = require("./routes/index.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 路由
routes(app);

app.listen(config.port, function () {
    console.log(`${config.appName} is server on ${config.host}:${config.port}`);
});
