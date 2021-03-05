const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;
const PhotoSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "user",
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
