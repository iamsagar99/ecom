import "../../assets/css/admin.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "bootstrap"
import { Outlet } from "react-router-dom"
import AdminComponent from "../../component/cms"
 import "react-toastify/dist/ReactToastify.css"
 import { ToastContainer } from "react-toastify"
const AdminLayout = ()=>{

    return(
        <>
        {/* <ToastContainer autoClose={1500} /> */}
        <AdminComponent.TopNavComponent/>
        <div id="layoutSidenav">
           <AdminComponent.AdminSidebarComponent/>
            <div id="layoutSidenav_content">
                <main>
                    <Outlet/>
                </main>
                <AdminComponent.AdminFooterComponent/>
            </div>
        </div>
        </>
    )
}
export default AdminLayout;