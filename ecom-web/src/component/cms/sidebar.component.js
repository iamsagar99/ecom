import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux"


export const AdminSidebarComponent = () => {
    const localUser = useSelector((store)=>{
        return store.user.userDetail;
    })
    
    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <NavLink className="nav-link" to="/admin">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-grid-horizontal"></i>
                                </div>
                                Dashboard
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/banner">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-images"></i>
                                </div>
                                Banner
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/brand">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-award"></i>
                                </div>
                                Brand
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/category">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-sitemap"></i>
                                </div>
                                Category
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/user">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-user-group"></i>
                                </div>
                                Users
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/product">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-shopping-bag"></i>
                                </div>
                                Product
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/order">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-cart-shopping"></i>
                                </div>
                                Order
                            </NavLink>

                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {
                           localUser.name
                        }
                    </div>
                </nav>
            </div>
        </>
    )
}