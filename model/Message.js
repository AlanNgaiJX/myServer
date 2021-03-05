const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;

const MessageSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },

        content: {
            type: String,
            require: true,
        },

        status: {
            type: Number,
            enum: [1, 2, 3], // [1:未读, 2:已读, 3:隐藏]
            default: 1,
            require: true,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const Message = mongoose.model("message", MessageSchema, "messages");

module.exports = exports = Message;
