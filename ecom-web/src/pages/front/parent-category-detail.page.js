import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CardLayout from "../../component/common/card-layout/card.layout";
import SingleProductView from "../../component/front/single-product-view/single-product-view.component";
import { getByParentCategory } from "../../services/category.service";
import { getProductByParentCategory } from "../../services/product.service";
import { getLabelByType } from "../../services/label.service";
import BrandCardLayout from "../../component/common/card-layout/brand-card.layout";
import "../../assets/css/home.css"

// import {getProductByCatId} from "../../services/product.service"

let label = [];


// let id = [];
const ParentCategoryDetailPage = () => {
    const params = useParams();
    const [products, setProducts] = useState();
    const [id, setid] = useState();
    const [cats,setCats] = useState();
    
    const getProductsByParentCats = async () => {
        try {
            let result = await getProductByParentCategory(params.slug)
            if(result.result){
            
                let all_products  = result.result.filter((item)=>item.status === 'active' && item.is_featured);
                // console.log("product",result.result)
                setProducts(all_products)
            }      
           
        } catch (error) {

        }
    }
    // const getProductByCategory = async () =>{
    //     // let result = await getProductByCatId(id);
    //     if(id.length>0){
    //         let result = await getProductByCatId(id);
    //     }
    // }
    
    const getCategoryByParent = async ()=>{
        // fetching child category of parent category
        try {
            let result = await getByParentCategory(params.slug)
            if (result.result) {
                let all_cats = result.result.filter((item) => item.status === 'active');
                setCats(all_cats);
                all_cats.map((item,index)=>{
                    item.brands.map((itm,indx)=>{
                        if(!label.includes(itm)){
                            label.push(itm)
                        }
                    })
                })

            }

        } catch (error) {

        }
    }


    useEffect(() => {
        getCategoryByParent();
        getProductsByParentCats();
        // getProductByCategory();
    }, [])
const unique = Array.from(label.reduce((map, obj)=> map.set(obj._id,obj),new Map()).values());
//   console.log("brand",brand)
    return (
        
             <Container fluid>
                <Row className="mt-1">
                    {
                        unique && unique.map((item, index) => (

                            <Col sm={6} md={2} key={index} className="row-cat">
                                <BrandCardLayout
                                    data={item}
                                    type="label"
                                />
                            </Col>
                        ))
                    }

               

                </Row>
                <hr />
                <h3 className="text-center m-0">Categories</h3>
                <Row className="mt-0">
                    
                    {
                        cats && cats.map((item, index) => (

                            <Col sm={6} md={2} key={index} className="mb-1">
                                <CardLayout
                                    data={item}
                                    type="category"
                                />
                            </Col>
                        ))
                    }

                </Row>
                <hr />
                <h2 className="text-center">Products</h2>
                <Row className="mt-1">
                    
                    {
                        products && products.map((item, index) => (

                            <Col sm={6} md={2} key={index} className="mb-3">
                                <SingleProductView
                                    data={item}
                                    type="product"
                                />
                            </Col>
                        ))
                    }

                </Row>

                    
            </Container>

        
        
    )
}

export default ParentCategoryDetailPage;