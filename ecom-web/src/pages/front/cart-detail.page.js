import { Container,Row,Col } from "react-bootstrap";
// import ActionButtons from "../../../../component/common/action-btns/action-buttons.component";
import DataTable from "react-data-table-component";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { postRequest } from "../../services/axios.service";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../assets/css/home.css"

const CartDetailPage = ()=>{
  let  imagePath = process.env.REACT_APP_IMAGE_URL+"product/";
    const columns = [
        {
            name: '',
            selector: row => <div className="cart-row-img">
            <img className="imag" src={imagePath + row.images[0]} alt="" />
            </div>
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Unit Price',
            selector: row =>  <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={row.after_discount} prefix="Npr. " />,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Total',
            selector: row =><NumericFormat displayType={"text"} thousandSeparator="," defaultValue={row.total} prefix="Npr. " />, 
        },
        // {
        //     name: 'Total',
        //     selector: row => <ActionButtons id={row._id} onDeleteClick={deleteBrand} updatePath = {`/admin/brand/`+row._id} />,
        // },
    ];

    const [data,setData] = useState();
    const current_cart = useSelector((store)=>{
        return store.cart.cartDetail;
    })

    const getCartDetail = useCallback(async ()=>{
         let response  = await postRequest("/cart/detail",current_cart);
        //  console.log(response)
        if(response.status){
          setData(response.result)
        }
    })

    useEffect(()=>{
        getCartDetail()
    },[])
    //  imagePath = process.env.REACT_APP_IMAGE_URL+"product/" + data.images;
    return(
        <>
            <Container className="mt-3">
                <Row>
                    <Col sm={12}>
                        <h1 className="text-center">Cart Detail</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col sm={12}>
                    <DataTable
                            columns={columns}
                            data={data}
                            pagination
                        />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                    {
                        data && 
                        <NavLink className="btn btn-sm btn-success float-end" to={"/checkout"} >CheckOut</NavLink>
                    }
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default CartDetailPage;