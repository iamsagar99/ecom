import { Col, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect } from "react";
import { deleteCategoryById, getCategoryByType } from "../../../../services/category.service";
import { useState } from "react";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";



const CategoryPage = () => {
    const deleteCategory = async (id)=>{
        try{
            let response = await deleteCategoryById(id);
            if(response.status){
                toast.success(response.msg)
                getAllCategory()
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
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Parent',
             selector: row => row.parent_id ? row.parent_id.title:"-",
        },
        {
            name: 'Brand',
             selector: row => row.brands ? (row.brands.map((item)=>item.title)).join(", "):"-",
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteCategory} updatePath = {`/admin/category/`+row._id} />,
        },
    ];
    const getAllCategory = async ()=>{
        try{
            let response = await getCategoryByType('category');
            // console.log("banner response:",response);
           if(response.status){
            setData(response.result)
            // console.log("cat-response:",response.result)
            // console.log("gg",response.result.brands);
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
        getAllCategory()
    },[])
    return (
        <>
            <div className="container-fluid px-4">
             <AdminBreadCrumb createUrl={"/admin/category/create"} type={"Category"} opt={"Listing"}/>
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
export default CategoryPage;