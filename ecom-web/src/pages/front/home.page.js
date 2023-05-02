import { Container, Card, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { getLabelByType } from "../../services/label.service"
import SliderComponent from "../../component/common/slider/slider.component";
import CardLayout from "../../component/common/card-layout/card.layout";
import { getCategoryByType } from "../../services/category.service";
import SingleProductView from "../../component/front/single-product-view/single-product-view.component";
import {getProduct} from "../../services/product.service"
import ShowTopCategory from "../../component/front/category-home.component";

const HomePage = () => {
    let [banners, setBanners] = useState();
    let [cats, setCats] = useState();
    let [products,setProducts] = useState();

    let getAllBanners = async () => {
        let result = await getLabelByType('banner');
        if (result) {
            let all_active_banners = result.result.filter((item) => item.status === 'active');
            setBanners(all_active_banners);
        }
    }

    let getAllCategories = async () => {
        let result = await getCategoryByType('category');
        if (result) {
            // console.log(result.result);
            let all_cats = result.result.filter((item) => item.status === 'active' && item.show_in_home === true && (item.parent_id != null));
            setCats(all_cats);
        }
    }
    let getAllProducts = async () =>{
        let result = await getProduct();
        if(result.result){
            
            let all_products  = result.result.filter((item)=>item.status === 'active' && item.is_featured);
            // console.log("product",result.result)
            setProducts(all_products)
        }
    }

    useEffect(() => {
        getAllBanners();
        getAllCategories();
        getAllProducts();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <SliderComponent
                data={banners}
                type="label"
            />
            <Container className="m-2">
                <ShowTopCategory/>
            </Container>
            <Container>
                <Row>
                    <Col sm={12} className="text-center">
                       <h2 className="text-center"> Categories</h2>
                    </Col>
                    <hr />
                </Row>
                <Row className="mt-3">
                    {
                        cats && cats.map((item, index) => (

                            <Col sm={6} md={2} key={index} className="mb-3">
                                <CardLayout
                                    data={item}
                                    type="category"
                                />
                            </Col>
                        ))
                    }

                </Row>
            </Container>

            <Container>
                <Row className="my-5">
                    <Col sm={12}>
                        <h4 className="text-center">
                            All Products
                        </h4>
                    </Col>
                    <hr />
                    <Row className="mb-3">
                       {
                        products && products.map((item,index)=>(
                            <Col sm={6} md={3} className="mt-3" key={index}>
                            <SingleProductView
                                data={item}
                                type="product"
                            />
                        </Col>
                        ))
                       }
                    </Row>
                </Row>
            </Container>
        </>
    );
}

export default HomePage;