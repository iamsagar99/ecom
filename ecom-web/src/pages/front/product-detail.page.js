import { useState } from "react";
import { Container, Row, Col, Badge,Form, Button } from "react-bootstrap";
import SliderComponent from "../../component/common/slider/slider.component";
import "../../assets/css/home.css"
import { NumericFormat } from "react-number-format";
import SingleProductView from "../../component/front/single-product-view/single-product-view.component";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../services/product.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addAnItemToCart } from "../../reducers/cart.reducer";

const ProductDetailPage = () => {
    const params = useParams();
    // console.log("params",params)
    let [data, setData] = useState()
    let dispatch = useDispatch();

    let [relatedProducts,setRelatedProducts] = useState()
    let [sliderData, setSliderData] = useState()
    let [qty,setQty] = useState(0);

    const getProduct = async()=>{
        try{
            let response = await getProductBySlug(params.slug)
            if(response.status){
                console.log("response.detail",response.detail)
                setData(response.detail);
                setRelatedProducts(response.related)
                let images = response.detail.images;

                let sliders = [];
                images.map((img)=>{
                    sliders.push(
                        {
                            image: img,
                            title: ""
                        }
                    )
                })
                setSliderData(sliders)
            }

        }catch(error){
            console.log(error);
        }
    }

    const addCurrentProductToCart = (event) =>{
        event.preventDefault();
        console.log("qty:",qty)
        dispatch(addAnItemToCart({
            qty: Number(qty),
            product_id: data._id
        }))
        toast.success("Product Updated On Your Cart")
    }
   
    useEffect(()=>{
        getProduct()
    },[params])
    return (<>
        <Container className="mt-5">
            {
                data &&
                <>
                    <Row>
                <Col sm={12} md={4}>
                    <SliderComponent
                        type="product"
                        data={sliderData}
                    />
                </Col>
                <Col sm={12} md={8}>
                    <Row>
                        <Col>
                            <h2 className="">{data.title}</h2>
                        </Col>
                        <hr />
                        <Row>
                            {
                                data.category &&
                                <Col sm={6} md={3}>
                                    <Badge bg="info">{data.category.title}</Badge>
                                </Col>
                            }
                            {
                                data.brand &&
                                <Col sm={6} md={3}>
                                    <Badge bg="success" className="increase-size">{data.brand.title}</Badge>
                                </Col>
                            }

                        </Row>
                        <Row>
                            <Col>
                                <small>{data.seller?.name}</small>
                            </Col>
                        </Row>
                        <Row>
                           <Col>
                           <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={data.after_discount} prefix="Npr. " />
                            {
                                data.discount && <del className="text-danger px-3">
                                <NumericFormat displayType={"text"} thousandSeparator="," defaultValue={data.price} prefix="Npr. " />

                                </del>
                            }
                           </Col>
                        </Row>
                    </Row>
                    <Row className="mt-3">
                            <Col>
                                <Form onSubmit={addCurrentProductToCart}>
                                    <Form.Group className="row mb-3">
                                        <Col sm={12} md={6}>
                                            <Form.Control
                                            type="number"
                                            name="qty"
                                            required
                                            placeholder="0"
                                            min="0"
                                            size="sm"
                                            defaultValue={qty}
                                            onChange={(e)=>{
                                                setQty(e.target.value)
                                            }}
                                            />
                                        </Col>
                                        <Col sm={12} md={6} className="d-grid gap-2">
                                           <Button variant="warning" type="submit" className="block" size="sm">Add to cart</Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                    </Row>

                </Col>
            </Row>
            <hr />
            <Row>
                <Col dangerouslySetInnerHTML={{__html:data.description}}>
                </Col>
            </Row>
            <hr />
            {/* 26 min /49:53 */}
            <Row>
                <Col className="h1" sm={12}>
                    <h2 className="text-center">Related Products</h2>
                </Col>
                <hr />  
               {
                   relatedProducts && relatedProducts.map((item,index)=>(
                        <Col sm={6} md={3} className="my-2"  key={index}>
                        <SingleProductView
                        data={item}
                        type="product"
                       
                        />
                         </Col>
                    ))
                }
            </Row>
                </>
            }
        </Container>
    </>)
}
export default ProductDetailPage;