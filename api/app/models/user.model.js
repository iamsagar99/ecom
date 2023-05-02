const mongoose = require("mongoose");
const AddressSchemaDef = new mongoose.Schema({
    address: String,
    house_no: Number
})
const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null
    },
    phone: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", 'inactive'],
        default: "inactive"
    },
    role: [{
        type: String,
        enum: ["admin", 'seller', 'customer'],
        default: "customer"
    }],
    role_id: [{
        type: mongoose.Types.ObjectId,
        ref: "Role",
        default: null
    }],
    address: {
        shipping: AddressSchemaDef,
        billing: AddressSchemaDef
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const UserModel = mongoose.model('User', UserSchemaDef)

module.exports = UserModel;