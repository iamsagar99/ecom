const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/config");
class AuthService {
    loginValidate = (data) => {
        let error = {};
        if(!data.email){
            error['email'] = "Email is required";
        } else {
            delete error['email'];
        }
        if(!data.password){
            error['password'] = "Password is required";
        } else {
            delete error['password'];
        }

        if(Object.keys(error).length){
            console.log(error);
            throw error;            
        } else {
            return data;
        }
    }

    registerValidate = (data,is_edit=false) => {
        let err_msg = {};

        if(!data.name){
            err_msg['name'] = "Name is required"
        }
        if(!is_edit){
            if(!data.email){
                err_msg['email'] = "Email is required"
            }
            if(!data.password){
                err_msg['password'] = "Password is required"
            }
        }
        if(!data.role){
            err_msg['role'] = "Role is required"
        }
        
        if(Object.keys(err_msg).length){
            return err_msg;
        } else {
            return null
        }
    }

    generateAccessToken = (data) => {
        let token = jwt.sign(data, CONFIG.JWT_SECRET);
        return token;
    }
}

module.exports = AuthService;