const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        path: {
            type: String, //тип строка
            required: true, // обязательное поле
        },
        name: {
            type: String, //тип строка
            required: true, // обязательное поле
        },
    },
    {
        timestamps: true, // поле иформаци когда была создана модель и когда модель была обновлена
    }
);

module.exports = model("Category", schema);
