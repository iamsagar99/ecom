import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createCategory } from "../../../../services/category.service";
import { CategoryForm } from "./category-form.component";

const default_value = {
    title: "",
    status: "inactive",
    image: "",
    parent_id:"",
    // brands:[],
    brands:null,  //sir ko ma yestoza
    show_in_home:false
    
}
const CategoryCreate = ()=>{
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            // console.log("submitted-value",data);
            let response = await createCategory(data);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/category");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            // console.log("error is:",error.response.data.msg.image)
            if(error.response.data.msg.image){
                toast.error(error.response.data.msg.image)
            }
            console.log(error)
            
        }
    }
    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Category" opt="Create"/>

        <div className="card mb-4">
            <div className="card-body">
               <CategoryForm 
               defaultData={default_value}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default CategoryCreate;