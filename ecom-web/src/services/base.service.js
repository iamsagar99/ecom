import { getRequest } from "./axios.service";

class BaseService {
   constructor(type){
      this.svc = type;
   }
   getById = (id) =>{
    return getRequest(this.svc+"/"+id);
   }
}

export default BaseService;