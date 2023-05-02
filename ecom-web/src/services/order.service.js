import APT_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";


// export const createCategory = async (data) =>{
//     // console.log("createCategory",data);
//     try{
//         let form_data = new FormData();

//         if(data.image){
//             form_data.append("image",data.image,data.image.name);
//             delete data.image;
//         }
    
//         Object.keys(data).map((item)=>{
//             form_data.append(item,data[item]);
//             return null;
//         })
    
//         let response = await postRequest(APT_ENDPOINTS.CATEGORY,form_data,true,true);
//         return response;
//     }catch(error){
//         throw error;
//     }
// }
export const getOrderById = async (id) =>{
     console.log("get order by id_",id);
    try {
        let result = await getRequest(APT_ENDPOINTS.ORDER+"/"+id,true);
        console.log("result order",result);
        return result;
    } catch (error) {
        throw error
    }
}
export const updateOrder = async(data,id) =>{
    // console.log("updatecategory-data-id",data,id);
    try{
        
        let response = await putRequest(APT_ENDPOINTS.ORDER+"/"+id,data,true);
        return response;
    }catch(error){
        throw error;
    }
}
export const deleteOrderById = async (id) =>{
    // console.log("delete-category-by-id",id);
    try {
        let result = await deleteRequest(APT_ENDPOINTS.ORDER+"/"+id,true)
        return result;
    } catch (error) {
        throw error
    }

}
// for pending listing
export const getOrderByType = async (type)=>{
    // console.log("getcategory by type",type)
    try {
        let result = await getRequest(APT_ENDPOINTS.ORDER+"?type="+type,true);
        return result;
    } catch (error) {
        throw error
    }
}