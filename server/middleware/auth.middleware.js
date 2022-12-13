const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next(); //метод next продолжает выполнение других middleware
    }
    try {
        // Bearer ewnlgkjfswgkjfwkj
        const token = req.headers.authorization.split(" ")[1]; // из строки делаем масиив через split делем по пробелу и забираем 1 элемент массива
        if (!token) {
            res.status(401).json({ message: "Unauthorised" });
        }
        const data = tokenService.validateAccesToken(token);
        if (!data) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = data; // добовляем req свойтсво user (express позволяет модернизировать req и res и он будет виден в дугих методах)
        // console.log("decoder", data);
        next(); //метод next продолжает выполнение других middleware
    } catch (e) {
        res.status(401).json({ message: "Unauthorised" });
    }
};
