const router = require("express").Router();
const loginCheck = require("../app/middleware/auth.middleware");
const {isAdmin} = require("../app/middleware/rbac.middlware");
const uploader = require("../app/middleware/file-upload.middleware");
const CategoryController = require("../app/controllers/category.controller");

const cat_ctrl = new CategoryController();
// http://localhost:9001/api/v1/category
//  post
const setDestination = (req,res,next) => {
    req.dest = "category"; 
    next()
}
router.route('/')
    .post(loginCheck, isAdmin, setDestination, uploader.single('image'), cat_ctrl.addCategory)
    .get(cat_ctrl.getAllCats)

router.route('/:id')
    .put(loginCheck, isAdmin, setDestination, uploader.single('image'), cat_ctrl.updateCategory)
    .delete(loginCheck, isAdmin, cat_ctrl.deleteCategoryById)
    .get(cat_ctrl.getCategoryById)
router.route('/parent/:slug')
    .get(cat_ctrl.getCategoryByParent)
module.exports = router;