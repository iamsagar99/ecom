class CategoryService {
    validateCategory = (data) => {
        let errMsg = {};

        if(!data.title){
            errMsg.title  = "Title is required"
        }

        if(!data.status){
            errMsg.status = "Status is required";
        }

        if(Object.keys(errMsg).length > 0){
            throw ({status: 400, msg: errMsg});
        } else {
            return null;
        }

    }
}

module.exports = CategoryService;