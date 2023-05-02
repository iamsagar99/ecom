import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createProduct } from "../../../../services/product.service";
// import { ProductForm } from "./product-form.component";
import { ProductCreateForm } from "./product-create-form.component";

const default_value = {
    title: "",
    category:"",
    status: "inactive",
    image: "",
    is_featured:false,
    brand:null, 
    price:0,
    discount:0,
    description:"",
    seller: null
    
}
const ProductCreate = ()=>{
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            console.log("submitted-value",data);
            // console.log("submitted-brand-value",data.brand.value);
             if(data.brand){
                // data.brand = data.brand.map((item)=>item.value)
                //data.brand = data.brand[0]['value']; sir ko ma yesto xa
                data.brand = data.brand.value
             }
            let response = await createProduct(data);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/product");
            }
            else{
                toast.error(response.msg)
            }
            // console.log("submitted-value",data);
        }catch(error){
            console.log("error is:",error.response.data.msg.image)
            if(error.response.data.msg.image){
                toast.error(error.response.data.msg.image)
            }
            console.log(error)
            
        }
    }
    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Product" opt="Create"/>

        <div className="card mb-4">
            <div className="card-body">
            <ProductCreateForm
               defaultData={default_value}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default ProductCreate;