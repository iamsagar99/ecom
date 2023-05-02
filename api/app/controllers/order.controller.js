const ClientOrdersModel = require("../models/client-orders.model");
const ProductModel = require("../models/product.model")
// user_id: req.auth_user._id, <= yo route lekhda loginCheck le return garne value ho /***useful xa
class OrderController{
  
    // createCart = async(req,res,next)=>{
    //    try{
    //     let cart = req.body;
    //         let product_ids = cart.map((item)=> item.product_id );
    //         let products = await ProductModel.find({
    //             _id:{$in: product_ids}
    //         });
    //         let final_result = [];
    //         let total_amount = 0;
    //         products.map((item)=>{
    //             let qty = 0;
    //             cart.map((cart_item)=>{
    //                 if(item._id.equals(cart_item.product_id)){
    //                     qty = Number(cart_item.qty)
    //                 }
    //             })
    //             total_amount += qty*item.after_discount
    //             let current_item = {
    //                 product_id:item._id,
    //                 quantity:qty,
    //                 total:qty*item.after_discount,
    //             }
    //             final_result.push(current_item)
    //         })

    //         let order_data = {

    //             user_id: req.auth_user._id,
    //             cart_detail:final_result,
    //             total_amount:total_amount,
    //             status:"new",
    //             is_paid:false
    //         }

    //         let client_order = new ClientOrdersModel(order_data);

    //         let response = await  client_order.save();

    //         res.json({
    //             result: response,
    //             status: true,
    //             msg: "Your order has been placed successfully."
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    getAllOrder = async(req,res,next)=>{
        try {
            let filters = {}
            // let deleteFilters = {}

        if(req.query){
            if(req.query.type && req.query.type!=="all"){
                filters ={
                    status: req.query.type
                }
            }
        }

        // let ack = await ClientOrdersModel.findOneAndDelete({
        //     status:"delivered",

        // })
        let data = await ClientOrdersModel.find(filters)
                    .populate("user_id")
                    .populate("cart_detail.product_id")
        res.json({
            result: data,
            msg: "Fetched Orders",
            status: true
        })
        } catch (error) {
            next(error)
        }
     }
     deleteOrderById = async(req,res,next)=>{
        try{
            let data = await ClientOrdersModel.findById(req.params.id);
            if(data){
                let ack = await ClientOrdersModel.findByIdAndDelete(req.params.id);
                res.json({
                    result: data,
                    msg: "Order deleted successfully.",
                    status: true
                })
            } else {
                next({
                    status: 400,
                    msg: "Order Not found."
                })
            }
            
        } catch(e) {
            next({
                status: 500,
                msg: e
            })
        } 
     }
     getOrderById = async(req,res,next)=>{
        try{
            let data = await ClientOrdersModel.findById(req.params.id);
             res.json({
                result: data,
                msg:"Order fetched by Id",
                status: true
             })
            
        } catch(e) {
            next({
                status: 500,
                msg: e
            })
        } 
     }
     updateOrderById = async (req,res,next) =>{

        try {
            let data = req.body;
            ClientOrdersModel.findByIdAndUpdate(req.params.id, {
                $set: data
            })
                .then((response) => {
                    res.json({
                        result: data,
                        status: true,
                        msg: "Order Updated Successfully."
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
}
module.exports = OrderController;