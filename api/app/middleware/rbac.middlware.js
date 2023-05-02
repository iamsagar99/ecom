const isAdmin = (req, res, next) => {
    let role = req.auth_user.role;
    if(role.includes('admin')) {
        next();
    } else {
        next({
            status: 403,
            msg: "Unauthorized"
        })
    }
}

const isSeller = (req, res, next) => {
    let role = req.auth_user.role;
    if(role.includes('seller')) {
        next();
    } else {
        next({
            status: 403,
            msg: "Unauthorized"
        })
    }
}

const isCustomer = (req, res, next) => {
    let role = req.auth_user.role;
    if(role.includes('customer')) {
        next();
    } else {
        next({
            status: 403,
            msg: "Unauthorized"
        })
    }
}


const isAdminSeller = (req,res,next) => {
    let role = req.auth_user.role;
    if(role.includes('admin') || role.includes('seller')){
        next();
    } else {
        next({
            status: 403,
            msg: "Unauthorized"
        })
    }
}

module.exports = {
    isAdmin,
    isSeller,
    isCustomer,
    isAdminSeller
}