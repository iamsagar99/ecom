const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");
const { isAdminSeller } = require("../app/middleware/rbac.middlware");
const ProductController = require("../app/controllers/product.controller");

const prod_ctrl = new ProductController();

const router = require("express").Router();

const setDestination = (req, res, next) => {
    req.dest = "product",
    next();
}

router.route('/')
    .get(prod_ctrl.getAllProducts)
    .post(loginCheck, isAdminSeller, setDestination, uploader.array('image'), prod_ctrl.addProduct)
router.get("/cat/:slug",prod_ctrl.getProductByCategory)
router.get("/cat/parent/:slug",prod_ctrl.getProductByParentCategory)
router.get("/byslug/:slug",prod_ctrl.getProductBySlug)
router.get("/brand/:slug",prod_ctrl.getProductByBrand)

router.route("/:id")
    .get(prod_ctrl.getProductById)
    .put(loginCheck,isAdminSeller,setDestination, uploader.array('image'),prod_ctrl.updateProduct)
    .delete(loginCheck,isAdminSeller,prod_ctrl.DeleteProductById)
    module.exports = router;