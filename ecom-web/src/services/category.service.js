import APT_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";


export const createCategory = async (data) =>{
    // console.log("createCategory",data);
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
    
        let response = await postRequest(APT_ENDPOINTS.CATEGORY,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}
export const getCategoryById = async (id) =>{
    // console.log("get categoru by id_",id);
    try {
        let result = await getRequest(APT_ENDPOINTS.CATEGORY+"/"+id,true);
        return result;
    } catch (error) {
        throw error
    }
}
export const updateCategory = async(data,id) =>{
    // console.log("updatecategory-data-id",data,id);
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
    
        let response = await putRequest(APT_ENDPOINTS.CATEGORY+"/"+id,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}
export const deleteCategoryById = async (id) =>{
    // console.log("delete-category-by-id",id);
    try {
        let result = await deleteRequest(APT_ENDPOINTS.CATEGORY+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }

}
export const getCategoryByType = async (type)=>{
    // console.log("getcategory by type",type)
    try {
        let result = await getRequest(APT_ENDPOINTS.CATEGORY);
        return result;
    } catch (error) {
        throw error
    }
}
export const getByParentCategory = async (slug) =>{
    // console.log("get categoru by id_",id);
    try {
        let result = await getRequest(APT_ENDPOINTS.CATEGORY+"/parent/"+slug,true);
        return result;
    } catch (error) {
        throw error
    }
}