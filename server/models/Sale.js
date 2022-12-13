const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        idPr: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        namePr: { type: String, required: true },
        imagePr: { type: String },
        categoryPr: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        sizePr: { type: Schema.Types.ObjectId, ref: "Size", required: true },
        colorPr: { type: Schema.Types.ObjectId, ref: "Color", required: true },
        pricePr: { type: Number, required: true },
        discountPr: { type: Number, required: true },
        quantityPr: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        orderId: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "created_at" }, // взамен поле createdAt будеи поле created_at
    }
);

module.exports = model("Sale", schema);
