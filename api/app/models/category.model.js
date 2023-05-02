const mongoose = require("mongoose");
const CategorySchemaDef = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, 
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    image: String,
    status: {
        type: String,
        enum: ["active",'inactive'],
        default: "inactive"
    },
    brands: [{
        type: mongoose.Types.ObjectId,
        ref: "Label"
    }],
    show_in_home: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

const CategoryModel = mongoose.model("Category", CategorySchemaDef);
module.exports = CategoryModel;