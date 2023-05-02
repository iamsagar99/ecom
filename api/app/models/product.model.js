const mongoose = require("mongoose");
const ProductSchemaDef = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    },
    slug: {
        type: String, 
        required: true, 
        unique: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required: true, 
        min: 1
    },
    description: {
        type: String
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 98
    },
    after_discount: {
        type: Number,
        min: 1,
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["active",'inactive','out-of-stock'],
        default: "inactive"
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Label",
        default: null,
    },
    is_featured: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});

const ProductModel = mongoose.model("Product", ProductSchemaDef);

module.exports= ProductModel;