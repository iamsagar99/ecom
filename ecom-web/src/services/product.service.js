import APT_ENDPOINTS from "../config/api-endpoints";
import { getRequest, postRequest,putRequest,deleteRequest } from "./axios.service";


export const createProduct = async (data) =>{
     console.log("createProduct:",data);
    try{
        let form_data = new FormData();

        if(data.image){
            data.image.map((item,)=>(
               
                form_data.append("image",item,item.name)
            ))
            delete data.image;
        }
    
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
        console.log("finalform-data",form_data);
        // debugger;
        let response = await postRequest(APT_ENDPOINTS.PRODUCT,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}
export const getProductById = async (id) =>{
    //  console.log("get prodict by id_",id);
    try {
        let result = await getRequest(APT_ENDPOINTS.PRODUCT+"/"+id,true);
        return result;
    } catch (error) {
        throw error
    }
}
export const updateProduct = async(data,id) =>{
   
    try{
        let form_data = new FormData();

        if(data.image){
            data.image.map((item)=>{
               if(typeof(item)==="object"){
                    console.log("coming obje:",item)
                   form_data.append("image",item,item.name)
               }
        })
            delete data.image;
            delete data.images;
        }
        if(data.brand){
            if(typeof(data.brand)==="object")
            {
                data.brand = data.brand.value
            }
        }
        // console.log("updateproduct-data-id",data,id);
        Object.keys(data).map((item)=>{
            form_data.append(item,data[item]);
            return null;
        })
        
        let response = await putRequest(APT_ENDPOINTS.PRODUCT+"/"+id,form_data,true,true);
        return response;
    }catch(error){
        throw error;
    }
}
export const deleteProductById = async (id) =>{
    //  console.log("delete-category-by-id",id);
        try {
            let result = await deleteRequest(APT_ENDPOINTS.PRODUCT+"/"+id,true)
            return result;
        } catch (error) {
            throw error
        }

}
export const getProduct = async ()=>{
    // console.log("getcategory by type",type)
    try {
        let result = await getRequest(APT_ENDPOINTS.PRODUCT);
        return result;
    } catch (error) {
        throw error
    }
}

export const getProductByCategory = async (slug) =>{
    try{
        let result = await getRequest(APT_ENDPOINTS.PRODUCT+"/cat/"+slug)
        return result;
    }catch(error){

    }
}
export const getProductByParentCategory = async (slug) =>{
    try{
        let result = await getRequest(APT_ENDPOINTS.PRODUCT+"/cat/parent/"+slug)
        return result;
    }catch(error){

    }
}
export const getProductBySlug = async (slug) =>{
    //  console.log("get prodict by id_",id);
    try {
        let result = await getRequest(APT_ENDPOINTS.PRODUCT+"/byslug/"+slug,true);
        console.log("result",result);
        return result;
    } catch (error) {
        throw error
    }
}
export const getProductByCatId = async (id)=>{
    try {
        let str="";
         id.map((item)=>{
            str+=id=","
        })
        console.log("stri",str);
        // let result = await getRequest(APT_ENDPOINTS.PRODUCT+"/cat/parent/"+slug,true);
        // console.log("result",result);
        // return result;
    } catch (error) {
        throw error
    }
}
export const getProductByBrand = async (slug) =>{
    try{
        let result = await getRequest(APT_ENDPOINTS.PRODUCT+"/brand/"+slug)
        return result;
    }catch(error){

    }
}