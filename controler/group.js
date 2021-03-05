const Group = require("../model/Group.js");

function createGroup(
    userId,
    groupName,
    groupIntro,
    groupType,
    groupPassword,
    groupLocation,
    groupCover
) {
    return new Group({
        groupOwnerId: userId,
        groupName,
        groupIntro,
        groupType,
        groupPassword,
        groupLocation,
        groupCover,
        groupMembers: [userId],
    }).save();
}

function findGroupsByOwner(userId) {
    return Group.find({
        groupOwnerId: userId,
    })
        .populate({
            path: "groupBlogs",
            populate: ["comments"],
        })
        .sort({
            createdAt: -1,
        });
}

function findGroupById(groupId) {
    return Group.findById(groupId);
}

function findGroupsByIds(groupIds) {
    return new Promise((resolve, reject) => {
        const queue = [];
        groupIds.forEach((id) => {
            queue.push(
                findGroupById(id).populate({
                    path: "groupBlogs",
                    populate: ["comments"],
                })
            );
        });
        Promise.all(queue)
            .then((values) => {
                resolve(values);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getAllGroupsByType(groupType) {
    return Group.find({
        groupType,
    })
        .populate({
            path: "groupBlogs",
            populate: ["comments"],
        })
        .sort({
            createdAt: -1,
        });
}

function updateGroupMembers(groupId, groupMembers) {
    return Group.findOneAndUpdate(
        {
            _id: groupId,
        },
        {
            groupMembers,
        }
    );
}

function getGroupDetail(groupId) {
    return Group.findOne({
        _id: groupId,
    })
        .populate("groupOwner")
        .populate({
            path: "groupMembers",
        })
        .populate({
            path: "groupBlogs",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
            populate: [
                "blogImages",
                "blogAuthor",
                {
                    path: "comments",
                    populate: ["commentAuthor"],
                },
            ],
        });
}

function pushGroupBlog(groupId, blogId) {
    console.log("pushGroupBlog", groupId, blogId);
    return Group.updateOne(
        {
            _id: groupId,
        },
        {
            $addToSet: {
                groupBlogs: blogId,
            },
        }
    );
}

module.exports = exports = {
    createGroup,
    findGroupsByOwner,
    findGroupById,
    findGroupsByIds,
    getAllGroupsByType,
    updateGroupMembers,
    getGroupDetail,
    pushGroupBlog,
};
