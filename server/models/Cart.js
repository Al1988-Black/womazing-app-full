const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        size: { type: Schema.Types.ObjectId, ref: "Size", required: true },
        color: { type: Schema.Types.ObjectId, ref: "Color", required: true },
        quantity: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: { createdAt: "created_at" }, // взамен поле createdAt будеи поле created_at
    }
);

module.exports = model("Cart", schema);
