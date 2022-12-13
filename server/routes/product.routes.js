const express = require("express");
const authMiddleWare = require("../middleware/auth.middleware");
const Product = require("../models/Product");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.post("/", authMiddleWare, async (req, res) => {
    try {
        const newProduct = await Product.create({
            ...req.body,
        });
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        if (currentUser.admin) {
            res.status(201).send(newProduct);
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
