import LightGallery from 'lightgallery/react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const ImageViewComponent = ({ src }) => {
    let path = process.env.REACT_APP_IMAGE_URL + src;
    // console.log("env",process.env.REACT_APP_NOT_SECRET_CODE)
    const onInit = (e)=>{

    }
    return (<>
        <LightGallery
            onInit={onInit}
            speed={150}
            plugins={[lgThumbnail, lgZoom]}
        >
            <a href={path}>
                    view-image
                </a>
        </LightGallery>
    </>)
}
export default ImageViewComponent;