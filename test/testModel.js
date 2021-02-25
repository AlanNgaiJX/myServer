const User = require("../model/User.js");
const pwd = "$2b$15$URP51DTVtLCI/aI0B3RRQecgO7UN2CCHBhceWvaLv6pUjrsctHZza";
const newUser = new User({
    phone: 11111111111,
    password: pwd,
});

newUser.save().then((res) => {
    console.log(res);
});
