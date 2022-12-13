const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        houseNumber: { type: String, required: true },
        flatNumber: { type: String, required: true },
        comment: { type: String },
        cash: { type: Boolean, required: true },
        costOrder: { type: Number, required: true },
        discountPromo: { type: Number, required: true },
    },
    {
        timestamps: { createdAt: "created_at" }, // взамен поле createdAt будеи поле created_at
    }
);

module.exports = model("Order", schema);
