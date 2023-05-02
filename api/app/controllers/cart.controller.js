const ClientOrdersModel = require("../models/client-orders.model");
const ProductModel = require("../models/product.model")
// user_id: req.auth_user._id, <= yo route lekhda loginCheck le return garne value ho /***useful xa
class CartController{
    getCartDetail = async(req,res,next)=>{
        try {
            let cart = req.body;
            let product_ids = cart.map((item)=> item.product_id );
            let products = await ProductModel.find({
                _id:{$in: product_ids}
            });
            let final_result = [];
            products.map((item)=>{
                let qty = 0;
                cart.map((cart_item)=>{
                    if(item._id.equals(cart_item.product_id)){
                        qty = Number(cart_item.qty)
                    }
                })
                let current_item = {
                    title:item.title,
                    quantity:qty,
                    after_discount:item.after_discount,
                    total:qty*item.after_discount,
                    images:item.images
                }
                final_result.push(current_item)
            })
            res.json({
                result: final_result,
                status: true,
                msg: "Cart Fetched"
            })
        } catch (error) {
            next(error)
        }
    }
    createCart = async(req,res,next)=>{
       try{
        console.log("cart",req.body);
        let cart = req.body;
            let product_ids = cart.map((item)=> item.product_id );
            let products = await ProductModel.find({
                _id:{$in: product_ids}
            });
            let final_result = [];
            let total_amount = 0;
            products.map((item)=>{
                let qty = 0;
                cart.map((cart_item)=>{
                    if(item._id.equals(cart_item.product_id)){
                        qty = Number(cart_item.qty)
                    }
                })
                total_amount += qty*item.after_discount
                let current_item = {
                    product_id:item._id,
                    quantity:qty,
                    total:qty*item.after_discount,
                }
                final_result.push(current_item)
            })

            let order_data = {

                user_id: req.auth_user._id,
                cart_detail:final_result,
                total_amount:total_amount,
                status:"new",
                is_paid:false
            }

            let client_order = new ClientOrdersModel(order_data);

            let response = await  client_order.save();

            res.json({
                result: response,
                status: true,
                msg: "Your order has been placed successfully."
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = CartController;