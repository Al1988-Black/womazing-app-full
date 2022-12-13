const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");
class TokenService {
    //return accessToken, refreshToken, expiresIn
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("accessSecret"), {
            expiresIn: "1h",
        }); //создаем accessToken методом jwt.sign, где config.get("accessSecret") - секретый ключ, expiresIn: "1h" - сколько существует ключ
        const refreshToken = jwt.sign(payload, config.get("refreshSecret")); //создаем refreshToken методом jwt.sign, где config.get("refreshSecret") - секретый ключ
        return { accessToken, refreshToken, expiresIn: 3600 };
    }
    async save(userId, refreshToken) {
        const data = await Token.findOne({ user: userId });
        if (data) {
            // проверяем если был сессия ранее то мы обновляем токен
            data.refreshToken = refreshToken;
            return data.save();
        }
        const token = await Token.create({ user: userId, refreshToken }); //если сессии ранее не было то мы создаем токен
        return token;
    }
    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get("refreshSecret"));
        } catch (error) {
            return null;
        }
    }
    validateAccesToken(accessToken) {
        try {
            return jwt.verify(accessToken, config.get("accessSecret"));
        } catch (error) {
            return null;
        }
    }
    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (error) {
            return null;
        }
    }
}

module.exports = new TokenService();
