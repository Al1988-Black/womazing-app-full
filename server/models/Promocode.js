const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String, //тип строка
            required: true, // обязательное поле
        },
        total: { type: Number, required: true },
        discount: { type: Number, required: true },
    },
    {
        timestamps: true, // поле иформаци когда была создана модель и когда модель была обновлена
    }
);

module.exports = model("Promocode", schema);
