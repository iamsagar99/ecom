import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { CreateLabel } from "../../../../services/label.service";
import { BannerForm } from "./banner-form.component";
const default_value = {
    title: "",
    link: "",
    status: "inactive",
    image: "",
    type: "banner"
}
const BannerCreate = ()=>{
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            let response = await CreateLabel(data);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/banner");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error)
            if(error.response.data.msg.image){
                toast.error(error.response.data.msg.image)
            }
        }
    }
    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="Banner" opt="Create"/>

        <div className="card mb-4">
            <div className="card-body">
               <BannerForm 
               defaultData={default_value}
               handleSubmit={handleSubmit}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default BannerCreate;