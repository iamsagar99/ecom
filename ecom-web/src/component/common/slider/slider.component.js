import { Carousel } from "react-bootstrap";
import "../../../assets/css/home.css"

const SliderItem = ({ type, image, title }) => {
    return (
        <>
            <div className="slider">
            <img
                className="d-block w-100 "
                src={process.env.REACT_APP_IMAGE_URL + type + "/" + image}
                alt="First slide"
            />
            </div>
            {
                title &&
                <Carousel.Caption>
                    <h3>{title}</h3>

                </Carousel.Caption>
            }
        </>
    )
}

const SliderComponent = ({ data, type }) => {
    // console.log("data",data)
    return (
        <>
            <Carousel fade>
                {
                    data && data.map((item, index) => (
                        <Carousel.Item key={index}>
                            {
                                item.link ? 
                                <a href={item.link} target="_new">
                                    
                                    <SliderItem type={type} title={item.title} image={item.image}/>

                                </a> :
                                    <>
                                        <SliderItem type={type} title={item.title} image={item.image}/>

                                    </>
                            }
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </>
    )
}
export default SliderComponent;