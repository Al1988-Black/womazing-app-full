const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors"); //импортируем middleware cors
const initDatebase = require("./startUp/initDatabase");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

const PORT = config.get("port") ?? 7070;

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDatebase();
        });
        await mongoose.connect(config.get("mongoUri"));
        console.log(chalk.green("Mongo connected."));
        app.listen(PORT, () =>
            console.log(
                chalk.green(`Server has been started on port ${PORT}...`)
            )
        );
    } catch (error) {
        console.log(chalk.red(error.messadge));
        process.exit(1);
    }
}

start();
