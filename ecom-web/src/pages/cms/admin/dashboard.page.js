import { NavLink } from "react-router-dom";

const AdminDashBoard = () =>{
    return(
        <>
            <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard Page</h1>
                        <ol className="breadcrumb mb-4">
                            {/* <li className="breadcrumb-item">Dashboard</li> */}
                            
                        </ol>
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-primary text-white mb-4">
                                    <div className="card-body">Primary Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin">View Details</NavLink>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-warning text-white mb-4">
                                    <div className="card-body">Warning Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin">View Details</NavLink>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-success text-white mb-4">
                                    <div className="card-body">Success Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin">View Details</NavLink>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-danger text-white mb-4">
                                    <div className="card-body">Danger Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin">View Details</NavLink>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                               
                            </div>
                        </div>
                    </div>
        </>
    )
}
export default AdminDashBoard;