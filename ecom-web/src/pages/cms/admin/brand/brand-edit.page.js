import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { getLabelById, UpdateLabel } from "../../../../services/label.service";
import { BrandForm } from "./brand-form.component";
import { useCallback, useEffect } from "react";
import { useState } from "react";
const default_value = {
    title: "",
    status: "inactive",
    image: "",
    type: "brand"
}
const BrandEdit = ()=>{
    const params = useParams();
    const [data,setData] = useState(default_value)
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            let response = await UpdateLabel(data,params.id);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/brand");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error)
            
        }
    }
    const getBrandDetail = useCallback(async () =>{
        try{
            let id = params.id;
            let result = await getLabelById(id);
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
        getBrandDetail()
    },[getBrandDetail])

    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Brand" opt="Edit"/>

        <div className="card mb-4">
            <div className="card-body">
               <BrandForm 
               defaultData={data}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default BrandEdit;