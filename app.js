const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require("./config/index.js");
const routes = require("./routes/index.js");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 路由
routes(app);

app.listen(config.port, function () {
    console.log(`${config.appName} is server on ${config.host}:${config.port}`);
});
