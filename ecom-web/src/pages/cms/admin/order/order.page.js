import { Col, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AdminBreadCrumb } from "../../../../component/cms/breadcrumb.component";
import { useEffect } from "react";
import { deleteOrderById, getOrderByType } from "../../../../services/order.service";
import { useState } from "react";
import { toast } from "react-toastify";
// import ImageViewComponent from "../../../../component/common/image-view.component";
import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import { NumericFormat } from "react-number-format";



const OrderPage = () => {
    const deleteOrder = async (id) => {
        try {
            let response = await deleteOrderById(id);
            if (response.status) {
                toast.success(response.msg)
                getAllOrder()
            }
            else {
                toast.error(response.msg);
            }
        } catch (err) {
            console.log("delete", err)
        }
    }
    const columns = [
        {
            name: 'OrderId',
            selector: row => row._id,
        },
        {
            name: 'Product Name',
            selector: row => <>

                {
                    row.cart_detail.map((item, index) => (
                        <Row key={index} className="m-2">
                            {index + 1 + "." + item.product_id.title.slice(0, 30)}
                        </Row>
                    ))
                }

            </>,
        },
        {
            name: 'Product-Id',
            selector: row => <>

                {
                    row.cart_detail.map((item, index) => (
                        <Row key={index} className="m-2">
                            {index + 1 + "." + item.product_id._id}
                        </Row>
                    ))
                }

            </>,
        },
        {
            name: 'Customer-Info',
            selector: row => <>
                <Row className="mx-2">
                    {"Id:" + row.user_id._id}
                </Row>
                <Row className="mx-2">
                    {"Name:" + row.user_id.name}
                </Row>
                <Row className="mx-2">
                    {"email:" + row.user_id.email}
                </Row>
                <Row className="mx-2">
                    {"Phone:" + row.user_id.phone}
                </Row>

            </>,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Total Amount',
            selector: row => <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={row.total_amount} prefix="Npr. " />,
        },
        {
            name: 'Is Paid:',
            selector: row => row.is_paid ? "Yes" : "No",
        },
        {
            name: 'Action',
            selector: row => <ActionButtons id={row._id} onDeleteClick={deleteOrder} updatePath={`/admin/order/` + row._id} />,
        },
    ];
    const getAllOrder = async () => {
        try {
            let response = await getOrderByType('all');
            // console.log("banner response:",response);
            if (response.status) {
                setData(response.result)
                console.log("order-response:", response.result)
                // console.log("gg",response.result.brands);
            }
            else {
                toast.error(response.msg)
            }
        } catch (err) {
            console.log(err)
            toast.error(err)
        }
    }
    const [data, setData] = useState();
    useEffect(() => {
        getAllOrder()
    }, [])
    return (
        <>
            <div className="container-fluid px-4">
                {/* <AdminBreadCrumb createUrl={"/admin/order/create"} type={"Order"} opt={"Listing"} /> */}
                {/* searching  */}
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
export default OrderPage;