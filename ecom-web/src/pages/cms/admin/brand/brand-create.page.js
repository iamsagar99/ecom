import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { CreateLabel } from "../../../../services/label.service";
import { BrandForm } from "./brand-form.component";
const default_value = {
    title: "",
    status: "",
    image: "",
    type: "brand"
}
const BrandCreate = ()=>{
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            let response = await CreateLabel(data);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/brand");
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

        <AdminBreadCrumb  type="Brand" opt="Create"/>

        <div className="card mb-4">
            <div className="card-body">
               <BrandForm 
               defaultData={default_value}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default BrandCreate;