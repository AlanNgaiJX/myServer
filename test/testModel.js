const Photo = require("../model/Photo.js");

const newPhoto = new Photo({
    userId: "6034d4e40bbc981be298f6f4",
    md5: "02e9775c-70bf-7692-8f06-5e025ad95ce9",
    src: "xxx",
    exif: "xxx",
});

newPhoto
    .save()
    .then((res) => {
        console.log("init photo");
    })
    .catch((err) => {
        console.log("err:", err);
    });
