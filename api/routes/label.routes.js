const express = require("express");
const router = express.Router();

const LabelController = require("../app/controllers/label.controller");
const label_ctrl = new LabelController();

const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");
const {isAdmin} = require("../app/middleware/rbac.middlware");
let setDestination = (req, res, next) => {
    req.dest = "label"; 
    next()
}

router.route('/')
    .get(label_ctrl.getAllLabels)
    .post(
        loginCheck,
        isAdmin, 
        setDestination, 
        uploader.single('image'), 
        label_ctrl.createLabel
    );

router.route('/:id')
    .get(label_ctrl.getLabelById)
    .put(
        loginCheck,
        isAdmin, 
        setDestination, 
        uploader.single('image'), 
        label_ctrl.updateLabel
    )
    .delete(loginCheck,isAdmin,label_ctrl.LabelDeleteById)
module.exports = router;