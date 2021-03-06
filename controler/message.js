const Message = require("../model/Message.js");

function createMessage(userId, content) {
    return new Message({
        userId,
        content,
    }).save();
}

function getAllMessageByUserId(userId) {
    return Message.find({
        userId,
        status: {
            $lt: 3,
        },
    }).sort({
        createAt: -1,
    });
}

function updateMessageReaded(messageId) {
    return Message.updateOne(
        {
            _id: messageId,
        },
        {
            status: 2,
        }
    );
}

function updateMessageHided(messageId) {
    return Message.updateOne(
        {
            _id: messageId,
        },
        {
            status: 3,
        }
    );
}

module.exports = exports = {
    createMessage,
    getAllMessageByUserId,
    updateMessageReaded,
    updateMessageHided,
};
