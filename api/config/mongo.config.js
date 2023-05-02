const mongoose = require('mongoose');
const dbUrl= "mongodb://localhost:27017/stack-10"

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