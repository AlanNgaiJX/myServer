module.exports = exports = (app) => {
    app.get("/", (req, res) => {
        // res.redirect("/posts");
    });
    app.use("/common", require("./common.js"));
    app.use("/regist", require("./regist.js"));
    app.use("/login", require("./login.js"));
    app.use("/photo", require("./photo.js"));
    app.use("/group", require("./group.js"));
    app.use("/blog", require("./blog.js"));
    app.use("/message", require("./message.js"));
    app.use("/test", require("./test.js"));
};
