const express = require("express");
const router = express.Router();
const loginCheck = require("../app/middleware/auth.middleware");
const {isAdmin} = require("../app/middleware/rbac.middlware")
const uploader = require("../app/middleware/file-upload.middleware");

// const rbac = require("../app/middleware/rbac.middlware")

const UserController = require("../app/controllers/user.controller");
let user_obj = new UserController();
let setDestination = (req, res, next) => {
    req.dest = "user"; 
    next()
}
// ..../user    ====> List all the users from DB
router.route('/')
    // .get(loginCheck, rbac.isAdmin,  (req, res, next) => {
    .get(loginCheck, isAdmin, user_obj.getAllUsers);

router.route('/:id')
//  ..../user/:id =====> Update user by id 
    .put(
        loginCheck,
        isAdmin,
        setDestination,
        uploader.single('image'),
        user_obj.updateUserById
        )
    // ..../user/:id =====> Delete user by id
    .delete(
        loginCheck,
        isAdmin,
        user_obj.deleteUserById
        )
    // ..../user/:id =====> get user by id
    .get(user_obj.getUserById)

module.exports = router;