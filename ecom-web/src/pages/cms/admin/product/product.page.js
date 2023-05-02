import { Col, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect } from "react";
import { deleteProductById, getProduct } from "../../../../services/product.service";
import { useState } from "react";
import { toast } from "react-toastify";
// import ImageViewComponent from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import { NumericFormat } from 'react-number-format';

// delete request ma id mismatched vako xa
const ProductPage = () => {

    const [data,setData] = useState();

    const deleteProduct = async (id)=>{
        try{
            let response = await deleteProductById(id);
            if(response.status){
                toast.success(response.msg)
                getAllProduct()
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
            name: 'Category',
             selector: row => row.category.title,
        },
        {
            name: 'Price',
            selector: row => <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={row.after_discount} prefix="Npr. "/>,
        },
        {
            name: 'Is Featured',
            selector: row => row.is_featured ? "Yes":"No",
        },
        {
            name: 'Brand',
             selector: row => row.brand ? row.brand.title : "-",
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteProduct} updatePath = {`/admin/product/`+row._id} />,
        },
    ];
    const getAllProduct = async ()=>{
        try{
            let response = await getProduct();
            //  console.log("product response:",response);
           if(response.status){
            setData(response.result)
             console.log("prod-response:",response.result)
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
   
    useEffect(()=>{
        getAllProduct()
    },[])
    return (
        <>
            <div className="container-fluid px-4">
             <AdminBreadCrumb createUrl={"/admin/product/create"} type={"product"} opt={"Listing"}/>
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
export default ProductPage;