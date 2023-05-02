const mongoose = require('mongoose');
const RoleSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true,    // createdAt, updatedAt,
    autoCreate: true,
    autoIndex: true
})
const RoleModel = mongoose.model("Role", RoleSchemaDef);
module.exports = RoleModel;