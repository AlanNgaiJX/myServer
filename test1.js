const mongoose = require("mongoose");
const User = require("./model/User.js");

const u = new User({
    phone: "18888888888",
    password: "666666666666666666666666666666666666666666666666666666666666"
})

u.save().then(res=>{
    console.log(res);
})

