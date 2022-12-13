const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true }, // unique: true-уникальный
        password: { type: String, required: true },
        image: { type: String },
        city: { type: Schema.Types.ObjectId, ref: "City" }, // делаем связь с моделью City
        admin: { type: Boolean, required: true },
    },
    {
        timestamps: true, // поле иформаци когда была создана модель и когда модель была обновлена
    }
);

module.exports = model("User", schema);
