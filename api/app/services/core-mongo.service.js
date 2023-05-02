const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "stack-10";

const db = () => {
    return new Promise((res, rej) => {
        MongoClient.connect(dbUrl, (err, client) => {
            if(err) {
                rej(err);
            } else {
                const db_obj = client.db(dbName)
                res(db_obj);
            }
        })
    })
}
module.exports = db;