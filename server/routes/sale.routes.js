const express = require("express");
const authMiddleWare = require("../middleware/auth.middleware");
const Sale = require("../models/Sale");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

// /api/sale
router
    .route("/")
    .get(authMiddleWare, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Sale.find({ [orderBy]: equalTo });
            res.status(200).send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(authMiddleWare, async (req, res) => {
        try {
            const newSale = await Sale.create({
                ...req.body,
                userId: req.user._id,
            });
            res.status(201).send(newSale);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.delete("/:saleId", authMiddleWare, async (req, res) => {
    try {
        const { saleId } = req.params;
        const removedSale = await Sale.findById(saleId);
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        if (currentUser.admin) {
            await removedSale.remove();
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
router.patch("/:saleId", authMiddleWare, async (req, res) => {
    try {
        const { saleId } = req.params;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        if (currentUser.admin) {
            const updatedSale = await Sale.findByIdAndUpdate(
                orderId,
                req.body,
                {
                    new: true,
                }
            );
            res.status(200).send(updatedSale);
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
