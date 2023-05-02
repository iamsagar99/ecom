import APT_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";

export const CreateLabel = async (data) =>{
    try{
        let form_data = new FormData();

        if(data.image){
            form_data.append("image",data.image,data.image.name);
            delete data.image;
        }
    
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
    
        let response = await postRequest(APT_ENDPOINTS.LABEL,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}

export const getLabelByType = async (type) =>{
    try {
        let result = await getRequest(APT_ENDPOINTS.LABEL+"?type="+type);
        return result;
    } catch (error) {
        throw error
    }
}

export const deleteLabelById = async (id)=>{
    try {
        let result = await deleteRequest(APT_ENDPOINTS.LABEL+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }
}
export const UpdateLabel = async (data,id) =>{
    try{
        let form_data = new FormData();

        if(data.image && typeof(data.image)==='object'){
            form_data.append("image",data.image,data.image.name);
            delete data.image;
        }
        else{
            delete data.image
        }
    
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
    
        let response = await putRequest(APT_ENDPOINTS.LABEL+"/"+id,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}
export const getLabelById = async (id)=>{
    try {
        let result = await getRequest(APT_ENDPOINTS.LABEL+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }
}
export const getLabelBySlug = async (slug) =>{
    try {
        let result = await getRequest(APT_ENDPOINTS.LABEL+"/brand/"+slug);
        return result;
    } catch (error) {
        throw error
    }
}