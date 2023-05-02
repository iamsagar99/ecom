import APT_ENDPOINTS from "../config/api-endpoints"
import { getRequest, postRequest } from "./axios.service"

export const login = async (data) => {
    
    try {
        let login_response = await postRequest(APT_ENDPOINTS.LOGIN_URL,data);
        if(login_response.result.access_token){
            localStorage.setItem("auth_token",login_response.result.access_token)
            let user_info = {
                name: login_response.result.user.name,
                email: login_response.result.user.email,
                _id: login_response.result.user._id,
                role: login_response.result.user.role,
            }
            localStorage.setItem("auth_user",JSON.stringify(user_info));
            return login_response.result;
        
        }   
        else{
            return login_response.result;
        }
     } catch (error) {
         throw error.response.data.msg
     }
}

export const getVerified = async () =>{
    try{
        let response  = await getRequest(APT_ENDPOINTS.VERIFY_USER,true)
        // debugger;
        // console.log(response)
       return response;
    }catch(error){
        //TODO: HANDLE ERROR  
        throw error     
    }
}
