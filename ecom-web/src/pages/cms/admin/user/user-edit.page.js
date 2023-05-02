import { ToastContainer,toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { getUserById, UpdateUser } from "../../../../services/user.service";
import { UserForm } from "./user-form.component";
import { useCallback, useEffect } from "react";
import { useState } from "react";
const default_value = {
    name: "",
    email:"",
    password: "",
    role: [],
    phone: "",
    address_shipping_address: "",
    address_shipping_house_no: "",
    address_billing_address: "",
    address_billing_house_no: "",
    image: "",
    status:""
}
const UserEdit = ()=>{
    const params = useParams();
    const [data,setData] = useState(default_value)
    const navigate = useNavigate();
    const handleSubmit = async (data) =>{
        try{
            let response = await UpdateUser(data,params.id);
            console.log("response",response);
            if(response.status){
                toast.success(response.msg);
                navigate("/admin/user");
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error)
            
        }
    }
    const getUserDetail = useCallback(async () =>{
        try{
            let id = params.id;
            let result = await getUserById(id);
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
        getUserDetail()
    },[getUserDetail])

    return(<>
    {/* <ToastContainer autoClose={1500} /> */}
        <div className="container-fluid px-4">

        <AdminBreadCrumb  type="User" opt="Edit"/>

        <div className="card mb-4">
            <div className="card-body">
               <UserForm 
               defaultData={data}
               handleSubmit={handleSubmit}
               edit={true}
               />
            </div>
        </div>
    </div>
    </>
    )
}
export default UserEdit;