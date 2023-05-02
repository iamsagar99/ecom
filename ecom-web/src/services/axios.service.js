import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BE_URL+"api/v1",
    timeout: 30000,
    timeoutErrorMessage: "Server timed out",
    headers:{
        "content-type": "application/json"
    }
})

httpRequest.interceptors.response.use((response)=>{
    // console.log("Server response",response);
    if(response.status === 200 || response.status === 201)
        return response.data
    else 
        throw response.data
})

let headers = {
    "content-type":"application/json"
}
let getHeaders = (is_strict,form_data=false)=>{
    if(is_strict){
        let token = localStorage.getItem("auth_token")
        headers ={
            // ...headers,
            // "authorization": "bearer "+token
            ...headers,
            "headers":{
                ...headers.headers,
                "authorization": "bearer "+token
            }
        }
    }
    if(form_data)
    {
        headers={
            ...headers,
            "headers":{
                ...headers.headers,
                "content-type":"multipart/form-data"
            }
        }
    }
}
export const postRequest = (url,data,is_strict=false,form_data=false)=>{
    if(is_strict){
        getHeaders(is_strict,form_data)
    }
    // console.log("url",url)
    console.log("datacart",data);
    return httpRequest.post(url,data,headers)
}

export const getRequest = (url,is_strict=false)=>{
//    if(is_strict)
//    {
//     getHeaders(is_strict);
//    }
// //    debugger;
// //    console.log(headers)
//    return httpRequest.get(url,{
//     headers: headers
//    });
getHeaders(is_strict)
return httpRequest.get(url,headers)
}

export const deleteRequest = (url,is_strict=false)=>{
    getHeaders(is_strict);
    return httpRequest.delete(url,headers)
}

export const putRequest = (url,data,is_strict=false,form_data=false)=>{
    if(is_strict){
        getHeaders(is_strict,form_data)
    }
    return httpRequest.put(url,data,headers)
}