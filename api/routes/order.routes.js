const router = require("express").Router();
const loginCheck = require("../app/middleware/auth.middleware");
const {isAdmin} = require("../app/middleware/rbac.middlware")
const OrderController = require("../app/controllers/order.controller");
const odr_ctrl = new OrderController();

router.route('/')
     .get(loginCheck,isAdmin,odr_ctrl.getAllOrder)
    
router.route("/:id")
     .get(loginCheck,odr_ctrl.getOrderById)
     .delete(loginCheck,odr_ctrl.deleteOrderById)
     .put(loginCheck,odr_ctrl.updateOrderById)


module.exports = router;


// router.route('/')
//     .get(prod_ctrl.getAllProducts)
//     .post(loginCheck, isAdminSeller, setDestination, uploader.array('image'), prod_ctrl.addProduct)
// router.get("/cat/:slug",prod_ctrl.getProductByCategory)
// router.get("/byslug/:slug",prod_ctrl.getProductBySlug)

// router.route("/:id")
//     .get(prod_ctrl.getProductById)
//     .put(loginCheck,isAdminSeller,setDestination, uploader.array('image'),prod_ctrl.updateProduct)
//     .delete(loginCheck,isAdminSeller,prod_ctrl.DeleteProductById)
//     module.exports = router;