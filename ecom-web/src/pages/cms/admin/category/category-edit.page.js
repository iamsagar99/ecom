import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { getCategoryById, updateCategory } from "../../../../services/category.service";
import { CategoryForm } from "./category-form.component";
import { useCallback, useEffect } from "react";
import { useState } from "react";
const default_value = {
    title: "",
    status: "inactive",
    image: "",
    parent_id:"",
    brands:[],
    show_in_home:false
    
}
const CategoryEdit = ()=>{
    const params = useParams();
    const [data,setData] = useState(default_value)
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            let response = await updateCategory(data,params.id);
            // console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/category");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error)
            
        }
    }
    const getCategoryDetail = useCallback(async () =>{
        try{
            let id = params.id;
            let result = await getCategoryById(id);
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
        getCategoryDetail()
    },[getCategoryDetail])

    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Category" opt="Edit"/>

        <div className="card mb-4">
            <div className="card-body">
               <CategoryForm 
               defaultData={data}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default CategoryEdit;