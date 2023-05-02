import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { createUser } from "../../../../services/user.service";
import { UserForm } from "./user-form.component";
const default_value = {
            name: "",
            email: "",
            password: "",
            role: [],
            phone: "",
            address_shipping_address: "",
            address_shipping_house_no: "",
            address_billing_address: "",
            address_billing_house_no: "",
            image: "",
            status:"inactive"
}
const UserCreate = ()=>{
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            // console.log("Data:",data)
            let response = await createUser(data);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/user");
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

        <AdminBreadCrumb  type="User" opt="Create"/>

        <div className="card mb-4">
            <div className="card-body">
               <UserForm 
               defaultData={default_value}
               handleSubmit={handleSubmit}
               edit={false}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default UserCreate;