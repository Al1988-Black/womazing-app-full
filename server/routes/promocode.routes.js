const express = require("express");
const Promocode = require("../models/Promocode");
const authMiddleWare = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", authMiddleWare, async (req, res) => {
    try {
        const { orderBy, equalTo } = req.query;
        const list = await Promocode.find({ [orderBy]: equalTo });
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
