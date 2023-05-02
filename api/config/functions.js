const fs = require("fs");
const makeDirectory = (path) => {
    // uploads/users/img/tmp
    let dir = process.cwd()+"/uploads/"+path;
    fs.mkdir(dir, {recursive: true}, (err, success) => {
        if(err) {
            // error 
            console.log("Desired Location could not be created. "+ err);
        }
    })
}

module.exports = {
    makeDirectory: makeDirectory
}