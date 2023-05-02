import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { getProductById, updateProduct } from "../../../../services/product.service";
import { ProductForm } from "./product-form.component";
import { useCallback, useEffect } from "react";
import { useState } from "react";
const default_value = {
    title: "",
    category:"",
    status: "inactive",
    image: "",
    is_featured:false,
    brand:{}, 
    price:0,
    discount:0,
    description:"",
    seller: {}
    
}
const ProductEdit = ()=>{
    const params = useParams();
    const [data,setData] = useState(default_value)
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            console.log("coming data",data);
            let response = await updateProduct(data,params.id);
            // console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/product");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error)
            
        }
    }
    const getProductDetail = useCallback(async () =>{
        try{
            let id = params.id;
            let result = await getProductById(id);
            console.log("productres",result.status);
             if(result.status)
             {
                setData(result.result)
             }
            
        }catch(err){
            console.log("fetch errror",err)
        }
    },[params.id])
    useEffect(()=>{
        getProductDetail()
    },[getProductDetail])

    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Product" opt="Edit"/>

        <div className="card mb-4">
            <div className="card-body">
               <ProductForm 
               defaultData={data}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default ProductEdit;