const express = require("express");
const User = require("../models/User");
const authMiddleWare = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
router.patch("/:userId", authMiddleWare, async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true,
            });
            res.status(200).send(updatedUser);
        } else {
            res.status(401).json({ message: "Unauthorised" });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
router.get("/:userId", authMiddleWare, async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUser = await User.findById(userId);
        res.status(200).send(currentUser);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
router.get("/", authMiddleWare, async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        if (currentUser.admin) {
            const list = await User.find();
            res.status(200).send(list);
        } else {
            res.status(401).json({ message: "Unauthorised" });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
module.exports = router;
