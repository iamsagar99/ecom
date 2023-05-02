import { Form, Button, Col } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";


export const BannerForm = ({defaultData,handleSubmit}) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        link: Yup.string().required("Link is required"),
        // status: Yup.array().of(Yup.string(["active", "inactive"])).required("Status is required"),
        status: Yup.string().required("Status is required"),

    });
    const formik = useFormik({
        initialValues: defaultData,
        validationSchema:validationSchema,
        onSubmit: (values) => {
           
            handleSubmit(values);
        }
    });

    useEffect(()=>{
        if(defaultData){
            formik.setValues(defaultData)
        }
    },[defaultData])

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="row mb-3" controlId="title">
                    <Form.Label className="col-sm-3">Title: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Banner Title"
                            required={true}
                            size={"sm"}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.title && <em className="text-danger">{formik.errors.title}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="link">
                    <Form.Label className="col-sm-3">Link: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="url"
                            name="link"
                            placeholder="Enter Banner Link"
                            required={true}
                            size={"sm"}
                            value={formik.values.link}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.link && <em className="text-danger">{formik.errors.link}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="status">
                    <Form.Label className="col-sm-3">Status: </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="status"
                            required={true}
                            onChange={formik.handleChange}
                            size="sm"
                             value={formik.values.status}
                        >
                            <option disabled>---Select Any One----</option>
                            <option value="inactive">Inactive</option>
                            <option value="active">Active</option>

                        </Form.Select>

                    </Col>
                </Form.Group>
                <Form.Group controlId="formFileSm" className="row mb-3">
                    <Form.Label className="col-sm-3">Image:</Form.Label>
                    <div className="col-sm-6">
                        <Form.Control type="file" size="sm" name="image" onChange={(e) => {
                            let file = e.target.files[0];
                            formik.setValues({
                                ...formik.values,
                                image: file
                            })
                        }} />
                    </div>
                    <div className="col-sm-3">
                    {
                        formik.values.image && typeof(formik.values.image) === 'object' ?
                        <img src={formik.values.image && URL.createObjectURL(formik.values.image)} className="img img-fluid" />
                        :
                        <img src={process.env.REACT_APP_IMAGE_URL+"/label/"+formik.values.image} className="img img-fluid" />

                    }
                    </div>
                </Form.Group>
                <Form.Group className="row  mb-3">
                    <Col sm={{ offset: 3, span: 9 }}>
                        <Button variant="danger" type="reset" size="sm" className="me-3" onClick={formik.resetForm}>Cancel <i className="fa fa-trash"></i></Button>
                        <Button variant="success" type="submit" size="sm">Submit <i className="fa fa-paper-plane"></i></Button>

                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}