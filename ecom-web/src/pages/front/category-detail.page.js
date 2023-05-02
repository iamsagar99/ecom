import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SingleProductView from "../../component/front/single-product-view/single-product-view.component";
import { getProductByCategory } from "../../services/product.service";


const CategoryDetailPage = () => {
    const params = useParams();
    const [products, setProducts] = useState();

    const getAllProductsByCategory = async () => {
        try {
            let all_cats_product = await getProductByCategory(params.slug)
            if (all_cats_product) {
                setProducts(all_cats_product.result)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllProductsByCategory();
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
                            <h3 className="text-danger text-center">Category is empty</h3>
                        </>
                }
            </Container>
        </>
    )
}

export default CategoryDetailPage;