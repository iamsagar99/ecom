import { Col, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect } from "react";
import { deleteLabelById, getLabelByType } from "../../../../services/label.service";
import { useState } from "react";
import { toast } from "react-toastify";
import ImageViewComponent from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";



const BrandPage = () => {
    const deleteBrand = async (id)=>{
        try{
            let response = await deleteLabelById(id);
            if(response.status){
                toast.success(response.msg)
                getAllBrands()
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
            name: 'Image',
            selector: row => <ImageViewComponent src={"/label/"+row.image}/>,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteBrand} updatePath = {`/admin/brand/`+row._id} />,
        },
    ];
    const getAllBrands = async ()=>{
        try{
            let response = await getLabelByType('brand');
            // console.log("banner response:",response);
           if(response.status){
            setData(response.result)
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
        getAllBrands()
    },[])
    return (
        <>
            <div className="container-fluid px-4">
             <AdminBreadCrumb createUrl={"/admin/brand/create"} type={"Brand"} opt={"Listing"}/>
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
export default BrandPage;