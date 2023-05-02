import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import noImageFound from "../../assets/image/no-image.png"
import "../../assets/css/home.css"
import { getCategoryByType } from "../../services/category.service";
import { Row, Col, Button } from "react-bootstrap";


const ShowTopCategory = () => {
    let [cats, setCats] = useState();
let navigate = useNavigate();
    let getAllCategories = async () => {
        let result = await getCategoryByType('category');
        if (result) {
            // console.log(result.result);
            let all_cats = result.result.filter((item) => item.status === 'active' && item.show_in_home === true && (item.parent_id === null));
            setCats(all_cats);
        }
    }
    // let image = noImageFound;
    //     if(data.image){
    //         image = process.env.REACT_APP_IMAGE_URL+"category/"+cats.image;
    //     }

    const handleError = (e) => {
        e.target.src = noImageFound;
    }
    useEffect(() => {
        getAllCategories();
    }, [])
    return (
        <>
            <Row>
                {
                    cats && cats.map((item, index) => (
                        <Col key={index} sm={4} md={2}>
                            <button class="rounded-pill arrow-button" onClick={()=>{
                                navigate("/category/parent/"+item.slug)
                            }}>
                                <img onError={handleError} src={item.image?process.env.REACT_APP_IMAGE_URL+"category/"+item.image:noImageFound} width="50" height="50" className="cat-img" /><span className="mx-1">{item.title}</span>
                                <span class="arrow"></span>
                            </button>
                        </Col>
                    ))
                }
            </Row>

        </>
    )
}
export default ShowTopCategory;