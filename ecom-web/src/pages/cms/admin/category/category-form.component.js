import { Form, Button, Col,Row } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";
import Select from 'react-select'
import { getCategoryByType } from "../../../../services/category.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { getLabelByType } from "../../../../services/label.service";
import {useSelector} from "react-redux"

export const CategoryForm = ({ defaultData, handleSubmit }) => {
    
    let logged_in_user = useSelector((store)=>{
        return store.user.userDetail;
    })

    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        // status: Yup.array().of(Yup.string(["active", "inactive"])).required("Status is required"),
        status: Yup.string().required("Status is required"),
        // parent_id: Yup.string().required("Parent Id is required"),
        brands: Yup.array().required("Brand is required"),

    });
    const [all_brands,setBrand] = useState();
    const [category,setCategory] = useState();

    // console.log("brands are",brand);
    // console.log("categories are",category);
   
    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log(values);
            if (values.brands) {
                values.brands = values.brands.map((item) => item.value)
            }
            if (values.brands.length <= 0) {
                formik.setErrors({
                    ...formik.errors,
                    brands: "Brand is required"
                })
            }else{
                // console.log(values)
                handleSubmit(values);
            }

            
        }
    });

    const getAllCategory = async ()=>{
        try{
            let response = await getCategoryByType('category');
           if(response.status){
            setCategory(response.result)
           
           }
           else{
            toast.error(response.msg)
           }
        }catch(err){
            throw err
        }
    }

    const getAllBrands = async ()=>{
        try{
            let response = await getLabelByType('brand');
            // console.log("banner response:",response);
            let brands = response.result.map((item)=>{
                return {
                    label: item.title,
                    value: item._id
                }
            })
           if(response.status){
            setBrand(brands)
           }
           else{
            toast.error(response.msg)
           }
        }catch(err){
            console.log(err)
            toast.error(err)
        }
    }

    useEffect(() => {
        getAllCategory();
        getAllBrands();
        if (defaultData) {
            // formik.setValues(defaultData)
            let sel_brands = [];
            let sel_cat = "";
            if(defaultData.brands){
                sel_brands = defaultData.brands.map((item)=>{
                        return {
                            label: item.title,
                            value: item._id
                        }
                    })
            }
            if(defaultData.parent_id){
                sel_cat = defaultData.parent_id._id;
            }
            formik.setValues({
                ...defaultData,
                brands: sel_brands,
                parent_id: sel_cat
            })
        }
    }, [defaultData])

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="row mb-3" controlId="title">
                    <Form.Label className="col-sm-3">Title: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Category Title"
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
                <Form.Group className="row mb-3" controlId="parent_id">
                    <Form.Label className="col-sm-3">Child Of: </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="parent_id"
                            required={true}
                            onChange={formik.handleChange}
                            size="sm"
                            value={formik.values.parent_id}

                        >
                            <option >---Select Any One----</option>
                            {
                                category && category.map((item,key)=>(

                                    <option value={item._id} key={key}>{item.title}</option>
                                ))
                            }
                           
                        </Form.Select>
                            {
                                formik.errors.parent_id && <em className="text-danger">{formik.errors.parent_id}</em>
                            }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="brands">
                    <Form.Label className="col-sm-3">Brand: </Form.Label>
                    <Col sm={9}>
                        <Select
                            options={all_brands}
                            isMulti
                            required
                            name="brands"
                            value={formik.values.brands}
                            onChange={(e) => {
                                formik.setValues({
                                    ...formik.values,
                                    brands: e
                                })
                            }}
                        />
                        {
                                formik.errors.brands && <em className="text-danger">{formik.errors.brands}</em>
                        }
                    </Col>
                </Form.Group>
                {
                    logged_in_user && logged_in_user.role.includes('admin') ? 
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
                            <option onClick={(e)=>e.preventDefault()}>---Select Any One----</option>
                            <option value="inactive">Inactive</option>
                            <option value="active">Active</option>

                        </Form.Select>
                        {
                                formik.errors.status && <em className="text-danger">{formik.errors.status}</em>
                        }
                    </Col>
                </Form.Group>
                : <></>
                }

                <Form.Group className="row-mb-3" controlId="show_in_home">
                    <Row>
                    <Col sm={3}>
                         <Form.Label >Show In Home</Form.Label>
                    </Col>
                    <Col sm={9}>
                            <Form.Check
                            type="checkbox"
                            label="Show In Home Page"
                            name="show_in_home"
                            value={1}
                            onChange={formik.handleChange}
                            checked = {formik.values.show_in_home}
                        />
                            {
                                formik.errors.show_in_home && <em className="text-danger">{formik.errors.show_in_home}</em>
                            }
                    </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="formFileSm" className="row mb-3">
                    <Form.Label className="col-sm-3">Image:</Form.Label>
                    <div className="col-sm-6">
                        <Form.Control type="file" size="sm" name="image" required={formik.values.image ? false : true} onChange={(e) => {
                            let file = e.target.files[0];
                            formik.setValues({
                                ...formik.values,
                                image: file
                            })
                        }} />
                    </div>
                    <div className="col-sm-3">
                        {
                            formik.values.image && typeof (formik.values.image) === 'object' ?
                                <img src={formik.values.image && URL.createObjectURL(formik.values.image)} className="img img-fluid" />
                                :
                                <img src={process.env.REACT_APP_IMAGE_URL + "/category/" + formik.values.image} className="img img-fluid" />

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