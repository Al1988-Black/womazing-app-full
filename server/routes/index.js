const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/category", require("./category.routes"));
router.use("/city", require("./city.routes"));
router.use("/color", require("./color.routes"));
router.use("/product", require("./product.routes"));
router.use("/promocode", require("./promocode.routes"));
router.use("/size", require("./size.routes"));
router.use("/sale", require("./sale.routes"));
router.use("/order", require("./order.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
