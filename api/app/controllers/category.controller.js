const CategoryModel = require("../models/category.model");
const CategoryService = require("../services/category.service");
const slugify = require("slugify");

class CategoryController {
    constructor() {
        this.cat_svc = new CategoryService();
    }

    addCategory = (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }
            this.cat_svc.validateCategory(data);

            if (!data.parent_id) {
                data.parent_id = null;
            }

            // ["","",""] => "","" =>
            if (data.brands) {
                data.brands = data.brands.split(",");
            }
            // data.brands =  data.brands.split(",");

            data.slug = slugify(data.title.toLowerCase());


            let category = new CategoryModel(data);
            category.save()
                .then((response) => {
                    res.json({
                        result: category,
                        status: true,
                        msg: "Category Created Successfully."
                    })
                })
                .catch((err) => {
                    next({
                        status: 500,
                        msg: err
                    })
                })
        } catch (err) {

            next(err);
        }
    }

    getAllCats = async (req, res, next) => {
        try {
            let filter = {};
            if (req.query.show_in_home) {
                filter = {
                    show_in_home: true
                }
            }
            let cats = await CategoryModel.find(filter)
                .populate('parent_id')
                .populate('brands')
            res.json({
                result: cats,
                status: true,
                msg: "Category fetched successfully."
            })
        } catch (err) {
            next({
                status: 500,
                msg: err
            })
        }
    }

    updateCategory = (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }
            this.cat_svc.validateCategory(data);

            if (!data.parent_id) {
                data.parent_id = null;
            }
            if (data.brands) {
                data.brands = data.brands.split(",");
            }
            CategoryModel.findByIdAndUpdate(req.params.id, {
                $set: data
            })
                .then((response) => {
                    res.json({
                        result: data,
                        status: true,
                        msg: "Category Updated Successfully."
                    })
                })
                .catch((err) => {
                    next({
                        status: 500,
                        msg: err
                    })
                })
        } catch (err) {

            next(err);
        }
    }

    deleteCategoryById = async (req, res, next) => {
        try {
            let ack = await CategoryModel.findByIdAndRemove(req.params.id)
            if (ack) {
                res.json({
                    result: ack,
                    status: true,
                    msg: "Category Deleted successfully."
                })
            } else {
                res.status(400).json({
                    status: false,
                    result: null,
                    msg: "Category does not exists or already deleted."
                })
            }
        } catch (err) {

            next({
                status: 500,
                msg: err
            });
        }
    }

    getCategoryById = async (req, res, next) => {
        try {
            let category = await CategoryModel.findById(req.params.id)
                .populate('parent_id')
                .populate('brands')
            if (category) {
                res.json({
                    result: category,
                    status: true,
                    msg: "Category Fetched "
                })
            } else {
                next({
                    status: 400,
                    msg: "Category does not exists"
                })
            }
        } catch (err) {

            next({
                status: 500,
                msg: err
            });
        }
    }
    getCategoryByParent = async (req, res, next) => {
        try {
            let filter = {};
            if (req.params.slug) {
                filter = {
                    slug: req.params.slug
                }
            }

            // console.log("slug", req.params.slug);
            let cats = await CategoryModel.findOne(filter)
                .populate('parent_id')
                .populate('brands');
            let data = await CategoryModel.find({
                parent_id: cats._id
            }).populate('brands');
            res.json({
                result: data,
                status: true,
                msg: "Category fetched By parent successfully."
            })
        } catch (err) {
            next({
                status: 500,
                msg: err
            })
        }
    }
}

module.exports = CategoryController;