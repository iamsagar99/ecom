const mongoose = require("mongoose");
const ClientOrdersSchemaDef = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    cart_detail:[{
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        quantity:Number,
        total: Number,

    }],
    total_amount: Number,
    status:{
        type:String,
        enum:["new","pending","cancelled","delivered"],
        default: "new"
    },
    is_paid:{
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

const ClientOrdersModel = mongoose.model("ClientOrders", ClientOrdersSchemaDef);
module.exports = ClientOrdersModel;