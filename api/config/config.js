const dotenv = require("dotenv");
dotenv.config();


const CONFIG = {
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = CONFIG;