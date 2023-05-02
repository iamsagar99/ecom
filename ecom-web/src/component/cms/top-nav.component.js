import { NavLink, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
export const TopNavComponent =()=>{

const navigate = useNavigate();

    // const localUser =  JSON.parse(localStorage.getItem('auth_user')) ?? null;
    const localUser = useSelector((store)=>{
        return store.user.userDetail;
    })
    
    const toggleSidebar = (e) =>{
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
   
   
    return(
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            {/* <!-- Navbar Brand--> */}
            <NavLink className="navbar-brand ps-3" to={"/"+localUser.role[0] }>Admin Panel</NavLink>
            {/* <NavLink className="navbar-brand ps-3" to={"/"+userRoute}>Admin Panel</NavLink> */}
            {/* <!-- Sidebar Toggle--> */}
            <button onClick={toggleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" ><i className="fas fa-bars"></i></button>
            {/* <!-- Navbar Search--> */}
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </div>
            {/* <!-- Navbar--> */}
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                        {
                           localUser.name
                        }
                        </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        {/* <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li> */}
                        <li><NavLink className="dropdown-item"  to="/login" onClick={(e)=>{
                            e.preventDefault();
                            localStorage.removeItem("auth_token");
                            localStorage.removeItem("auth_user");
                            navigate("/login");
                        }}>Logout</NavLink></li>
                    </ul>
                </li>
            </ul>
        </nav>
        </>
    )
}