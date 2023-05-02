const router = require("express").Router();
const loginCheck = require("../app/middleware/auth.middleware");
const {isAdmin} = require("../app/middleware/rbac.middlware")
const CartController = require("../app/controllers/cart.controller");
const cart_ctrl = new CartController();
    router.post("/detail",cart_ctrl.getCartDetail)
    router.post("/create",loginCheck,cart_ctrl.createCart)

module.exports = router;