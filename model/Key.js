const mongoose = require("../db/index.js");

const KeySchema = mongoose.Schema(
    {
        // 公钥
        publicKey: {
            type: String,
            required: true,
        },

        // 私钥
        privateKey: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const Key = mongoose.model("key", KeySchema, "keys");

module.exports = exports = Key;
