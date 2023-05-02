import { Card, Badge, Button, Form } from "react-bootstrap";
import noImageFound from "../../../assets/image/no-image.png"
import "../../../assets/css/home.css"
import { NavLink } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
// import ReactTooltip from "react-tooltip"
import {useSelector, useDispatch} from "react-redux"
import { addAnItemToCart } from "../../../reducers/cart.reducer";
import {toast, ToastContainer} from "react-toastify"

const SingleProductView = ({ data, type }) => {


    const handleError = (e) =>
    {
        e.target.src = noImageFound;
    }

    let dispatch = useDispatch();

    let all_cart = useSelector((store)=>{
    return store.cart.cartDetail;    
    });
    const addCurrentProductToCart = (event) =>{
        dispatch(addAnItemToCart({
            product_id: data._id,
            qty: 1
        }));
        toast.success("Cart Updated Successfully");
    }
    // console.log("all cart:",all_cart);





 let image = process.env.REACT_APP_IMAGE_URL + type + "/" + data.images[0];
    return (
        <>
        {/* <ToastContainer autoClose={1500}/> */}
            <Card>
                <div className="prod-div">
                    <img src={image} alt="" className="imag" />
                </div>
                {/* <Card.Img onError={handleError} className="img img-fluid product-thumb" variant="top"  src={data.images ? (process.env.REACT_APP_IMAGE_URL + type + "/" + data.images[0]) : noImageFound} /> */}
                <Card.Body>
                    <Card.Title className="h6">
                        <p className="text-center" >
                            {
                                data.slug ?
                                    <NavLink className="text-decoration-none text-dark " to={"/" + type + "/" + data.slug}>{data.title.length>30?data.title.slice(0,30)+"...":data.title}</NavLink>
                                    :
                                    <>{data.title.slice(0,30)+"..."}</>
                            }
                        </p>
                        {/* <ReactTooltip place="right" type="dark" effect="float"/> */}
                    </Card.Title>
                    <Card.Text>
                        <p>
                            <Badge pill bg="info">
                               <NavLink to={"/category/"+data.category.slug} className="text-decoration-none text-light"> {data.category && data.category.title}</NavLink>
                               {/* {data.category && data.category.title} */}
                            </Badge>
                        </p>
                        <p className="h6 my-3">
                            <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={data.after_discount} prefix="Npr. " />
                            {
                                data.discount && <del className="text-danger px-3">
                                <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={data.price} prefix="Npr. " />

                                </del>
                            }
                        </p>
                        <Button type="button" variant="warning" size="sm" onClick={addCurrentProductToCart}>Add To Cart</Button>

                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
export default SingleProductView;