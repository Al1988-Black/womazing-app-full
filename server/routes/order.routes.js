const express = require("express");
const authMiddleWare = require("../middleware/auth.middleware");
const Order = require("../models/Order");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(authMiddleWare, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const currentUserId = req.user._id;
            const currentUser = await User.findById(currentUserId);
            if (currentUser.admin) {
            }
            const list = await Order.find({ [orderBy]: equalTo });
            res.status(200).send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(authMiddleWare, async (req, res) => {
        try {
            const newOrder = await Order.create({
                ...req.body,
                userId: req.user._id,
            });
            res.status(201).send(newOrder);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });
router.delete("/:orderId", authMiddleWare, async (req, res) => {
    try {
        const { orderId } = req.params;
        const removedOrder = await Order.findById(orderId);
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        if (currentUser.admin) {
            await removedOrder.remove();
            return res.send(null);
        } else {
            res.status(401).json({ message: "Unauthorised" });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
router.patch("/:orderId", authMiddleWare, async (req, res) => {
    try {
        const { orderId } = req.params;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        if (currentUser.admin) {
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                req.body,
                {
                    new: true,
                }
            );
            res.status(200).send(updatedOrder);
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
