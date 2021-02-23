const { registUser } = require("./controler/user.js");
registUser("18122803695", "123123123a").then((res) => {
    console.log(res);
});
