import { Col, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect } from "react";
import { deleteUserById, getUserByRole } from "../../../../services/user.service";
import { useState } from "react";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
// import {useSelector} from "react-redux"

//30:40 redux

const UserPage = () => {
    const deleteUser = async (id)=>{
        try{
            let response = await deleteUserById(id);
            if(response.status){
                toast.success(response.msg)
                getAllUsers()
            }
            else{
                toast.error(response.msg);
            }
        }catch(err){
            console.log("delete",err)
        }
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Role',
            selector: row => row.role.join(", "),
        },
        {
            name: 'Image',
            selector: row => <ImageViewComponent src={"/user/"+row.image}/>,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteUser} updatePath = {`/admin/user/`+row._id} />,
        },
    ];
    const getAllUsers = async ()=>{
        try{
            let response = await getUserByRole('all');
            console.log("user response:",response);
           if(response.status){
            let logged_in_user = JSON.parse(localStorage.getItem("auth_user"))
            let all_users = response.result.filter((item)=> item._id !== logged_in_user._id);
            setData(all_users)
           }
           else{
            toast.error(response.msg)
           }
        }catch(err){
            console.log(err)
            toast.error(err)
        }
    }
    const [data,setData] = useState();
    useEffect(()=>{
        getAllUsers()
    },[])
    return (
        <>
            <div className="container-fluid px-4">
             <AdminBreadCrumb createUrl={"/admin/user/create"} type={"User"} opt={"Listing"}/>
                <Row>
                    <Col sm={12}>

                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default UserPage;