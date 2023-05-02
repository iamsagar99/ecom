import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SingleProductView from "../../component/front/single-product-view/single-product-view.component";
import { getLabelBySlug } from "../../services/label.service";
import { getProductByBrand } from "../../services/product.service";


const BrandDetailPage = () => {
    const params = useParams();
    const [products, setProducts] = useState();

    const getAllProductsByBrand = async () => {
        try {
            let all_cats_product = await getProductByBrand(params.slug)
            if (all_cats_product) {
                setProducts(all_cats_product.result)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllProductsByBrand();
    }, [])
    return (
        <>
            <Container>
                {
                  products && products.length > 0 ?
                        <>
                            <Row className="mt-4">
                                <Col>
                                    <h1 className="text-center">Product Listing Of {params.slug}</h1>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                {
                                    products && products.map((item, index) => (
                                        <Col key={index} sm={6} md={3} className="mt-3">
                                            <SingleProductView data={item} type="product" />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </>
                        :
                        <>
                            <h3 className="text-danger text-center">Brand is empty</h3>
                        </>
                }
            </Container>
        </>
    )
}

export default BrandDetailPage;