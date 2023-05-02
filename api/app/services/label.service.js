const slugify = require("slugify");

class LabelService {
    validateLabelData = (data, is_edit = false) => {
        // title, image, link,  type: [banner, brand], status: [active, inactive]
        let err = {};
        if(!data.title){
            err['title'] = "Title is required."
        } else {
           delete err['title'];
        }

        if(!is_edit){
            if(!data.image){
                err['image'] = "Image is required."
            } else {
               delete err['image'];
            }
        }

        if(!data.type){
            err['type'] = "Type is required."
        } else {

            if(data.type !== 'banner' || data.type !== 'brand'){
                delete  err['type'];
            } else {
                err['type'] = "Either Brand or banner is only allowed as a type";
            }
        }

        if(!data.status){
            err['status'] = "Status is required."
        } else {
            if(data.status != 'active' || data.status != 'inactive'){
                delete err['status']
            } else {
                err['status'] = "Active or Inactive can only be the value for status";
            }
        }

        if(Object.keys(err).length > 0){
            return err
        } else {
            return null;
        }
    }

    getLabelSlug = (str) => {
        return slugify(str.toLowerCase());
    }
}

module.exports = LabelService