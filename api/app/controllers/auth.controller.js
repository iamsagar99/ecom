const UserModel = require("../models/user.model");
const AuthService =  require("../services/auth.service");
const bcrypt = require("bcrypt");


// localhost, 127.0.0.1, ::1, private ip

// const mongodb = new MongoClient(dbUrl);
class AuthController {
    constructor(){
        this.auth_svc = new AuthService();
    }

    login = async (req, res, next) => {
        try{
            let data = req.body;
            let result = this.auth_svc.loginValidate(data);
            let user = await UserModel.findOne({
                email: data.email
            });
            if(user) {
                if(bcrypt.compareSync(data.password, user.password)){
                    
                    let access_token = this.auth_svc.generateAccessToken({
                        id: user._id,
                        name: user.name,
                        role: user.role
                    })
                    
                    res.json({
                        result: {
                            user: user,
                            access_token:access_token
                        },
                        status: true, 
                        msg: "Login successful"
                    })
                } else {
                    throw "Credentials does not match"
                }
            } else {
                throw "User does not exists"
            }
            
        } catch(error){
            // error 
            console.log("LoginException: ", error);
                next({
                    status: 400,
                    msg: error
                })
        }
    }

    register = (req, res, next) => {

        let data = req.body;
        console.log("data-req",data)
        if(req.file) { // req.files
            // 
            data.image = req.file.filename
        }
        try{

            let validation = this.auth_svc.registerValidate(data);

            
            if(validation){
                next({
                    status: 400,
                    msg: validation
                }) 
            } else {
                
                // passwrod encrypt
                let hash = bcrypt.hashSync(data.password, 10);
                data.password = hash;
                
                if(data.role){
                    data.role = data.role.split(",");
                }
                data.address = {
                    billing:{
                        address:data.address_billing_address,
                        house_no:data.address_billing_house_no,
                    },
                    shipping:{
                        address:data.address_shipping_address,
                        house_no:data.address_shipping_house_no,
                    }
                }

                let user = new UserModel(data);
                    // mongoose function save 
                    // it stores the data in User model for now.
                    // insert , insertOne, insertMany
                // [{},{},{}]
                // UserModel.insertMany()
                user.save()
                .then((ack) => {
                    res.json({
                        result: user,
                        status: true,
                        msg: "User Registered successfully."
                    })
                })
                .catch((err) => {
                    next({
                        status: 500,
                        msg: err
                    })
                })
                
            }
            
        } catch(error) {
            next({
                status: 400,
                msg: error
            })
        }
    }

    verifyUser = (req,res,next)=>{
        if(req.auth_user)
             res.json({
                result: req.auth_user,
                msg: "Verified",
                status: true
             });
        else
          next({
            status: 403,
            msg: "Unauthorized"
          })
    }
}

module.exports = AuthController