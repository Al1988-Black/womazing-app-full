const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });
const tokenService = require("../services/token.service");

// 1 get data from req (email, password ...)
// 2 check if user already exists
// 3 hash password
// 4 create user
// 5 generate token

router.post("/signUp", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длинна пароля 8 символов").isLength({
        min: 8,
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array(), //получаем конкретные ошибки заполненных полей
                    },
                });
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email }); //если в модели User пользователь с таким email {email:email} эквивалент {email}
            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXIST",
                        code: 400,
                    },
                });
            }
            const hashedPassword = await bcrypt.hash(password, 12); //хэшируем пароль цифра 10 или 12  влияет на сложность шифрования
            const newUser = await User.create({
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...req.body,
                password: hashedPassword,
                admin: false,
            });
            const tokens = tokenService.generate({ _id: newUser._id }); //генерируем токены
            await tokenService.save(newUser._id, tokens.refreshToken); // сохраняем refreshToken в модель Token
            res.status(201).send({ ...tokens, userId: newUser._id }); // делаем response
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    },
]);

// 1 validate data
// 2 find user
// 3 compared(сравнить) hashed password
// 4 generate token
// 5 return data
router.post("/signInWithPassword", [
    check("email", "Email некорректный").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(), // Проверяем существует ли вообще пароль
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        // errors: errors.array(), //получаем конкретные ошибки заполненных полей
                    },
                });
            }
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400,
                    },
                });
            }
            const isPasswordEqual = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isPasswordEqual) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400,
                    },
                });
            }
            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);
            res.status(200).send({ ...tokens, userId: existingUser._id });
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    },
]);
router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body; //делаем переменную refresh_token перемнной  refreshToken
        const data = tokenService.validateRefreshToken(refreshToken);
        const dataBaseToken = await tokenService.findToken(refreshToken);
        if (
            !data ||
            !dataBaseToken ||
            data._id !== dataBaseToken?.user?.toString()
        ) {
            return res.status(401).json({ message: "Unauthorized" }); //проверяем данные если их нет или они не совпадаем отправляем ошибку
        }
        const tokens = await tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);
        res.status(200).send({ ...tokens, userId: data._id });
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
