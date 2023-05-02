const ProductService = require("../services/product.service");
const slugify = require("slugify");
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model")

class ProductController {
    constructor() {
        this.prod_svc = new ProductService();
    }
    addProduct = (req, res, next) => {
        // TODO: Add Product
        try {
            let data = req.body;
            if (req.files) {
                let images = [];
                req.files.map((image) => {
                    images.push(image.filename)
                })
                data.images = images;
            }

            this.prod_svc.validateProduct(data);

            data.slug = slugify(data.title.toLowerCase());
            data.after_discount = data.price - data.price * data.discount / 100;

            if (!data.category) {
                data.category = null;
            }

            if (!data.brand) {
                data.brand = null;
            }

            if (!data.seller) {
                data.seller = null;
            }

            let product = new ProductModel(data)
            product.save()
                .then((response) => {
                    res.json({
                        result: product,
                        status: true,
                        msg: "Product created successfully."
                    })
                })
                .catch((error) => {
                    next({
                        status: 400,
                        msg: error
                    })
                })

        } catch (error) {
            next(error)
        }
    }
    getAllProducts = async (req, res, next) => {
        try {
            let result = await ProductModel.find()
                .populate('category')
                .populate('brand')
                .populate('seller')
            res.json({
                result: result,
                msg: "Fetched all Products",
                status: true
            })
        } catch (error) {
            next(error)
        }
    }
    getProductById = async (req, res, next) => {
        try {
            let product = await ProductModel.findById(req.params.id)
                .populate('category')
                .populate('brand')
                .populate('seller')
            res.json({
                result: product,
                msg: "Fetched Product by id",
                status: true
            })
        } catch (error) {
            next(error)
        }
    }
    updateProduct = (req, res, next) => {
        // TODO: Add Product
        try {
            console.log("req", req)
            let data = req.body;
            if (req.files) {
                let images = [];
                req.files.map((image) => {
                    images.push(image.filename)
                })
                data.images = images;
            }

            /// haha this is jugad.
            if (data.images.length <= 0) {
                console.log("data.images null array");
                delete data["images"];
            }
            this.prod_svc.validateProduct(data);

            // data.slug = slugify(data.title.toLowerCase());
            data.after_discount = data.price - data.price * data.discount / 100;

            if (!data.category) {
                data.category = null;
            }

            if (!data.brand) {
                data.brand = null;
            }

            if (!data.seller) {
                data.seller = null;
            }
            console.log("data", data);
            ProductModel.findByIdAndUpdate(req.params.id, {
                $set: data
            })
                .then((response) => {

                    res.json({
                        result: response,
                        status: true,
                        msg: "Product Updated successfully."
                    })
                })
                .catch((error) => {
                    next({
                        status: 400,
                        msg: error
                    })
                })

        } catch (error) {
            next(error)
        }
    }
    DeleteProductById = async (req, res, next) => {
        try {
            let data = await ProductModel.findById(req.params.id);
            if (data) {
                let ack = await ProductModel.findByIdAndDelete(req.params.id);
                res.json({
                    result: data,
                    msg: "Product deleted successfully.",
                    status: true
                })
            } else {
                next({
                    status: 400,
                    msg: "Product Not found."
                })
            }

        } catch (e) {
            next({
                status: 500,
                msg: e
            })
        }
    }
    getProductByCategory = async (req, res, next) => {
        try {
            // let products = await ProductModel.find()
            //                 .populate('category')
            //                 .populate('brand')
            //                 .populate('seller');
            // let filtered = products.filter((item)=> item.category.slug === req.params.slug )
            // console.log("filtered:",filtered)

            let products = await ProductModel.aggregate([
                {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'category',
                        'foreignField': '_id',
                        'as': 'category'
                    }
                }, {
                    '$unwind': {
                        'path': '$category'
                    }
                }, {
                    '$match': {
                        'category.slug': req.params.slug,
                        'status': 'active'
                    }
                },
                {
                    '$lookup': {
                        'from': 'labels',
                        'localField': 'brand',
                        'foreignField': '_id',
                        'as': 'brand'
                    }
                }, {
                    '$unwind': {
                        'path': '$brand'
                    }
                },
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'seller',
                        'foreignField': '_id',
                        'as': 'seller'
                    }
                }, {
                    '$unwind': {
                        'path': '$seller'
                    }
                }


            ])

            res.json({
                result: products,
                status: true,
                msg: "Product Fetched by category"
            })
        } catch (error) {
            next(error);
        }
    }
    getProductBySlug = async (req, res, next) => {
        try {
            let product = await ProductModel.findOne({ slug: req.params.slug })
                .populate('category')
                .populate('brand')
                .populate('seller');
            let related_product = await ProductModel.find({
                category: product.category._id,
                status: "active"
            })
                .populate('category')
                .populate('brand')
                .populate('seller');

            res.json({
                detail: product,
                related: related_product,
                msg: "Fetched Product by slug",
                status: true
            })
        } catch (error) {
            next(error)
        }
    }
    getProductByParentCategory = async (req, res, next) => {
        try {
            // let products = await ProductModel.find()
            //                 .populate('category')
            //                 .populate('brand')
            //                 .populate('seller');
            // let filtered = products.filter((item)=> item.category.slug === req.params.slug )
            // console.log("filtered:",filtered)
            let cats = await CategoryModel.findOne({slug: req.params.slug})
                .populate('parent_id')
                .populate('brands');
            let data = await CategoryModel.find({
                parent_id: cats._id
            })
            let ids = [];
            data.map((item)=>{
                let id = item._id
                  let val = id.toString();
                ids.push(id);
            })

            let filter = {category:{$in:ids}}




            // console.log(ids)
            let products = await ProductModel.find(filter)
                        .populate('category')
                        .populate('brand')
                        .populate('seller');
            
            // let filtered =[];
            // products.map((item)=>{
            //     let data = (item.category._id).toString();
            //     console.log(data)
            //     if(ids.includes(data)){
            //         console.log("hi")
            //     }
            //     else{
            //         console.log("bye");
            //     }
            // })

            res.json({
            
                result: products,
                status: true,
                msg: "Product  fetched by parent cat."
            })
        } catch (error) {
            next(error);
        }
    }
    getProductByBrand = async (req,res,next)=>{
         try {
            let products = await ProductModel.find()
                            .populate('category')
                            .populate('brand')
                            .populate('seller');
            let filtered = products.filter((item)=> item.brand.slug === req.params.slug )
            res.json({
                result: filtered,
                msg: "Fetched Product by brand",
                status: true
            })
         } catch (error) {
            console.log(error);
         }
        
    }

}

module.exports = ProductController;