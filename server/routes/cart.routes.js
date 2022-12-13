const express = require("express");
const authMiddleWare = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");
const router = express.Router({ mergeParams: true });

// /api/cart
router
    .route("/")
    .get(authMiddleWare, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Cart.find({ [orderBy]: equalTo });
            res.status(200).send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(authMiddleWare, async (req, res) => {
        try {
            const newCart = await Cart.create({
                ...req.body,
                userId: req.user._id,
            });
            res.status(201).send(newCart);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.patch("/:cartId", authMiddleWare, async (req, res) => {
    try {
        const { cartId } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(cartId, req.body, {
            new: true,
        });
        res.status(200).send(updatedCart);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
router.delete("/:cartId", authMiddleWare, async (req, res) => {
    try {
        const { cartId } = req.params;
        const removedCart = await Cart.findById(cartId);
        if (removedCart.userId.toString() === req.user._id) {
            await removedCart.remove();
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
module.exports = router;
