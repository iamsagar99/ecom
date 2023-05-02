class ProductService{
    validateProduct = (data) => {
        let errMsg = {};
        if(!data.title) {
            errMsg.title = "Product Title is required";
        }

        if(!data.price) {
            errMsg.price = "Product Price is required";
        }

        if(!data.category) {
            errMsg.category = "Category is required";
        }

        if(Object.keys(errMsg).length) {
            throw {
                status: 400,
                msg: errMsg
            }
        } else {
            return null;
        }
        
    }
}

module.exports = ProductService;