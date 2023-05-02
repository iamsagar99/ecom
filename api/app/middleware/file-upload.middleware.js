const multer = require("multer");
const {makeDirectory} =  require("../../config/functions")
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        makeDirectory(req.dest);
        let path = process.cwd()+"/uploads/"+req.dest;
        cb(null, path)
    },
    filename: (req, file, cb) => {
        let date = Date.now();
        let file_name = date+"-"+file.originalname;
        cb(null, file_name)
    }
});
const imageFilter = (req, file, cb) => {
    let allowed_images = ["jpg",'jpeg','png', 'svg','gif','bmp','webp'];
    let file_ext = file.originalname.split(".");
    file_ext = file_ext[file_ext.length - 1];   // PNG

    if(file_ext && allowed_images.includes(file_ext.toLowerCase())){
        // 
        cb(null, true);
    } else {
        cb({
            status: 400,
            msg: "Unsupported File Format"
        }, false);
    }
}
const uploader = multer({
    // dest: "uploads"
    storage: myStorage,
    fileFilter: imageFilter
})


module.exports =  uploader;