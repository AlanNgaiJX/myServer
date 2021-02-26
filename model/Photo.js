const mongoose = require("../db/index.js");
const PhotoSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },

        md5: {
            type: String,
            require: true,
        },

        src: {
            type: String,
            require: true,
        },

        exif: {
            type: String,
            require: true,
            default: "",
        },

        width:{
            type: Number,
            require: true
        },

        height:{
            type: Number,
            require: true
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const Photo = mongoose.model("photo", PhotoSchema, "photos");

module.exports = exports = Photo;
