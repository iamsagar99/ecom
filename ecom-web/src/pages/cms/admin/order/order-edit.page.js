import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { getOrderById, updateOrder } from "../../../../services/order.service";
import { OrderForm } from "./order-form.component";
import { useCallback, useEffect } from "react";
import { useState } from "react";
const default_value = {
    title: "",
    category:"",
    status: "",
    image: "",
    is_paid:false,
    brand:{}, 
    price:0,
    discount:0,
    description:"",
    seller: {}
    
}
const OrderEdit = ()=>{
    const params = useParams();
    const [data,setData] = useState(default_value)
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            let response = await updateOrder(data,params.id);
            // console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/order");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error)
            
        }
    }
    const getOrderDetail = useCallback(async () =>{
        try{
            let id = params.id;
            let result = await getOrderById(id);
            // console.log(result.status);
             if(result.status)
             {
                setData(result.result)
             }
            
        }catch(err){
            console.log("fetch errror",err)
        }
    },[params.id])
    useEffect(()=>{
        getOrderDetail()
    },[getOrderDetail])

    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Order" opt="Edit"/>

        <div className="card mb-4">
            <div className="card-body">
               <OrderForm 
               defaultData={data}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default OrderEdit;