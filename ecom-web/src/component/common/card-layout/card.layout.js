import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import noImageFound from "../../../assets/image/no-image.png"
import "../../../assets/css/home.css"



const CardLayout = ({data,type}) => {


    const handleError = (e) =>{
        e.target.src = noImageFound;
    }

    let image = noImageFound;
    if(data.image){
        image = process.env.REACT_APP_IMAGE_URL+type+"/"+data.image;
    }

    return (
        <>

            <Card>
            <div className="cat-div">
                    <img onError={handleError} src={image} alt="" className="imag" />
            </div>
                {/* <Card.Img onError={handleError} className="thumb-small" variant="top" src={ data.image ? (process.env.REACT_APP_IMAGE_URL+type+"/"+data.image) : noImageFound  } /> */}
                <Card.Body>
                    <Card.Title className="text-center ">
                        {
                            data.slug ?
                            <NavLink className="text-decoration-none text-dark" to={"/"+type+"/"+data.slug}>{data.title}</NavLink>
                            :
                            <p>{data.title}</p>
                        }
                    </Card.Title>
                </Card.Body>
            </Card>

        </>
    )
}
export default CardLayout;