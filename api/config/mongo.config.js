const mongoose = require('mongoose');
// const dbUrl= "mongodb://localhost:27017/stack-10"
// const  dbUrl = process.env.MONGO_CON;
const dbUrl = "mongodb+srv://iamsagar099:R7sEFE6PwcAvEPTv@cluster0.norvprb.mongodb.net/?retryWrites=true&w=majority"


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