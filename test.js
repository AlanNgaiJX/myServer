const mongoose = require("mongoose");

mongoose
    .connect("mongodb://devGroupup:123456@localhost:27017/groupupdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("连接数据库成功");
    })
    .catch(() => {
        console.log("连接数据库失败");
    });

const UserSchema = mongoose.Schema({
    nickName: String,
    phone: String,
});

const User = mongoose.model("user", UserSchema, "users");

const u = new User({
    nickName: 'Alex',
    phone:'1681828368'
})

u.save().then((res)=>{
    console.log("插入成功", res);
}).catch(err=>{
    console.log(err);
})

User.find({})
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
