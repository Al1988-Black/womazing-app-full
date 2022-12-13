const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        refreshToken: { type: String, required: true },
    },
    {
        timestamps: true, // поле иформаци когда была создана модель и когда модель была обновлена
    }
);

module.exports = model("Token", schema);
