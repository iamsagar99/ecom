const express = require("express");
const app = express();
require("./config/mongo.config");

const routes = require("./routes/route");
// const myEvent = require('./app/events/events');
const cors = require('cors')

const PORT = 9003;
// app.use((req, res, next) => {
//     req.myEvent = myEvent;
//     next();
// })
app.use(cors())
// express.json() => application/json
app.use(express.json());
// express.urlencoded() => application/urlencoded
app.use(express.urlencoded({
    extended: false
}))
// multipart/form-data

app.use("/assets", express.static(process.cwd()+"/uploads"));
app.use("/public", express.static(process.cwd()+"/public"));

// app.set('view engine', 'pug')
// app.set('views', process.cwd()+'/views');
// jade 



// http://localhost:9001/api/v1/
app.use("/api/v1/", routes)
//app.use(routes)

app.use((req,res, next) => {
    next({
        status: 404,
        msg: "Not found"
    })
})
// error page handling
app.use((error, req, res, next) => {
    console.log("Err: ", error)
    let status = error.status || 500
    let msg = error.msg || "Server Errror"

    res.status(status).json({
        result: null,
        msg: msg,
        status: false
    })
});

app.listen(PORT, 'localhost', (err) => {
    if(err) {
        console.error("APP: ", err);
        console.log(`Error listening to port ${PORT}`);
    } else {
        console.log(`Server is listening to port ${PORT}`);
        console.log("Press CTRL+C to end server");
    }
})