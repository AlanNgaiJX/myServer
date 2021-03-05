const express = require("express");
const router = express.Router();
const {
    createGroup,
    findGroupsByOwner,
    findGroupsByIds,
    findGroupById,
    getAllGroupsByType,
    updateGroupMembers,
    getGroupDetail,
} = require("../controler/group.js");
const { createMessage } = require("../controler/message.js");
const { getUserById, updateUserPartIn } = require("../controler/user.js");
const { jwtAuth, catchJwtAuth } = require("../utils/middlewares.js");

/* 创建群组 */
router.post("/createGroup", jwtAuth, catchJwtAuth, async function (req, res) {
    const {
        userId,
        groupName,
        groupIntro,
        groupType,
        groupPassword,
        groupLocation,
        groupCover,
    } = req.body;

    createGroup(
        userId,
        groupName,
        groupIntro,
        groupType,
        groupPassword,
        groupLocation,
        groupCover
    )
        .then((result) => {
            res.json({
                code: 200,
                data: {
                    groupId: result._id,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

/* 根据userId获取其创建的[群组] */
router.post(
    "/findGroupsByOwner",
    jwtAuth,
    catchJwtAuth,
    async function (req, res) {
        const { userId } = req.body;
        findGroupsByOwner(userId)
            .then((result) => {
                res.json({
                    code: 200,
                    data: result,
                });
            })
            .catch((err) => {
                res.json({
                    code: 500,
                    msg: "未知错误",
                });
            });
    }
);

/* 根据userId获取其参与的群组 */
router.post(
    "/findPartGroups",
    jwtAuth,
    catchJwtAuth,
    async function (req, res) {
        const { userId } = req.body;

        try {
            const user = await getUserById(userId);
            if (user.participateIn.length) {
                const result = await findGroupsByIds(user.participateIn);
                res.json({
                    code: 200,
                    data: result,
                });
            } else {
                res.json({
                    code: 200,
                    data: [],
                });
            }
        } catch (error) {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        }
    }
);

/* 根据userId获取已加入群组的[id] */
router.post(
    "/findPartGroupsId",
    jwtAuth,
    catchJwtAuth,
    async function (req, res) {
        const { userId } = req.body;
        if (userId === "") {
            res.json({
                code: 200,
                data: [],
            });
            return;
        }
        try {
            const user = await getUserById(userId);
            res.json({
                code: 200,
                data: user.participateIn,
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        }
    }
);

/* 根据 群组Id 获取群组 */
router.post("/findGroupById", async function (req, res) {
    const { groupId } = req.body;
    findGroupById(groupId)
        .then((result) => {
            res.json({
                code: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

/* 根据 [群组Id]获取[群组] */
router.post("/findGroupsByIds", async function (req, res) {
    const { groupIds } = req.body;
    findGroupsByIds(groupIds)
        .then((result) => {
            res.json({
                code: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

/* 获取所有公开群组 */
router.post("/getAllPublicGroups", async function (req, res) {
    const { userId } = req.body;
    return getAllGroupsByType(2)
        .then((result) => {
            result = result.map((item) => {
                const o = {
                    groupBlogs: item.groupBlogs,
                    createdAt: item.createdAt,
                    groupCover: item.groupCover,
                    groupIntro: item.groupIntro,
                    groupLocation: item.groupLocation,
                    groupMembers: item.groupMembers,
                    groupName: item.groupName,
                    groupOwner: item.groupOwner,
                    groupPassword: item.groupPassword,
                    groupType: item.groupType,
                    _id: item.id,
                    isPartIn: item.groupMembers.includes(userId),
                };
                return o;
            });
            res.json({
                code: 200,
                data: result,
            });
        })
        .catch((err) => {
            res.json({
                code: 500,
                msg: "未知错误",
            });
        });
});

/* 加入群组 */
router.post("/joinGroup", jwtAuth, catchJwtAuth, async function (req, res) {
    const { userId, groupId } = req.body;
    try {
        const user = await getUserById(userId);
        if (!user.participateIn.includes(groupId)) {
            user.participateIn.unshift(groupId);
            await updateUserPartIn(userId, user.participateIn);
        }
        const group = await findGroupById(groupId);
        if (!group.groupMembers.includes(userId)) {
            group.groupMembers.unshift(userId);
            await updateGroupMembers(groupId, group.groupMembers);
            await createMessage(
                group.groupOwner,
                user.userInfo.nickName + "加入了小组 " + group.groupName
            );
            res.json({
                code: 200,
                msg: "正常加入",
            });
        } else {
            res.json({
                code: 200,
                msg: "之前已经加入",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            code: 500,
            msg: "未知错误",
        });
    }
});

/* 获取群组详细信息 */
router.post("/getGroupDetail", async function (req, res) {
    const { groupId } = req.body;
    getGroupDetail(groupId).then((result) => {
        res.json({
            code: 200,
            data: result,
        });
    });
});

module.exports = exports = router;
