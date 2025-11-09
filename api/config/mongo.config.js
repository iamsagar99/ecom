const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const  dbUrl = process.env.MONGO_CON;

mongoose.connect(dbUrl,{
    autoCreate: true,
    autoIndex: true
}, (err)=> {
    if(err) {
        console.error("Mongo connection errro: "+err);
    } else {
        console.log("Db Connected successfully.");
    }
})