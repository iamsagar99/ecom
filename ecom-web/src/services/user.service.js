import APT_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";

export const createUser = async (data) =>{
    try{
        let form_data = new FormData();

        if(data.image){
            form_data.append("image",data.image,data.image.name);
            delete data.image;
        }
        if(data.role){
            data.role = data.role.map((item)=>item.value)
            
        }
        delete data.role_id;
        
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
    
        let response = await postRequest(APT_ENDPOINTS.REGISTER_URL,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}

export const getUserByRole = async (role) =>{
    try {
        let result = await getRequest(APT_ENDPOINTS.USER+"?role="+role,true);
        return result;
    } catch (error) {
        throw error
    }
}

export const deleteUserById = async (id)=>{
    try {
        let result = await deleteRequest(APT_ENDPOINTS.USER+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }
}
export const UpdateUser = async (data,id) =>{
    try{
        let form_data = new FormData();

        if(data.image && typeof(data.image)==='object'){
            form_data.append("image",data.image,data.image.name);
            delete data.image;
        }
        else{
            delete data.image
        }
        if(data.role){
            data.role = data.role.map((item)=>item.value)
            
        }
        delete data.role_id;
    
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
    
        let response = await putRequest(APT_ENDPOINTS.USER+"/"+id,form_data,true,true);
        console.log("resp",response)
        return response;
    }catch(error){
        throw error;
    }
}
export const getUserById = async (id)=>{
    try {
        let result = await getRequest(APT_ENDPOINTS.USER+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }
}
export const getUserAll = async ()=>{
    try {
        let result = await getRequest(APT_ENDPOINTS.USER,true)
        return result;
    } catch (error) {
        throw error
    }
}