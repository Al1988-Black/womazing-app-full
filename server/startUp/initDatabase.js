const Category = require("../models/Category");
const City = require("../models/City");
const Color = require("../models/Color");
const Promocode = require("../models/Promocode");
const Size = require("../models/Size");
const categoryMock = require("../mock/category.json");
const cityMock = require("../mock/city.json");
const colorMock = require("../mock/color.json");
const promocodeMock = require("../mock/promocode.json");
const sizeMock = require("../mock/size.json");

module.exports = async () => {
    const categories = await Category.find();
    if (categories.length !== categoryMock.length) {
        await createInitalEntity(Category, categoryMock);
    }
    const cities = await City.find();
    if (cities.length !== cityMock.length) {
        await createInitalEntity(City, cityMock);
    }
    const colors = await Color.find();
    if (colors.length !== colorMock.length) {
        await createInitalEntity(Color, colorMock);
    }
    const promocodes = await Promocode.find();
    if (promocodes.length !== promocodeMock.length) {
        await createInitalEntity(Promocode, promocodeMock);
    }
    const sizes = await Size.find();
    if (sizes.length !== sizeMock.length) {
        await createInitalEntity(Size, sizeMock);
    }
};

async function createInitalEntity(Model, data) {
    await Model.collection.drop(); //очищаем коллекцию
    Promise.all(
        data.map(async (item) => {
            try {
                delete item._id; //удаляем _id
                const newItem = new Model(item);
                await newItem.save(); //сохраняем данные
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
