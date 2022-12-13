const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String, //тип строка
            required: true, // обязательное поле
        },
        color: {
            type: String, //тип строка
            required: true, // обязательное поле
        },
    },
    {
        timestamps: true, // поле иформаци когда была создана модель и когда модель была обновлена
    }
);

module.exports = model("Color", schema);
