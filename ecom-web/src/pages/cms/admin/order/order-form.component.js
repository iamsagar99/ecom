import { Form, Button, Col,Row } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";
import Select from 'react-select'
import { getOrderByType } from "../../../../services/order.service";
import { toast } from "react-toastify";
import { useState } from "react";
// import { getLabelByType } from "../../../../services/label.service";
import {useSelector} from "react-redux"

export const OrderForm = ({ defaultData, handleSubmit }) => {
    
    // let logged_in_user = useSelector((store)=>{
    //     return store.user.userDetail;
    // })

    const validationSchema = Yup.object().shape({
        // title: Yup.string().required('Title is Required'),
        // is_paid: Yup.required("Payment status is required.")
         status: Yup.string().required("Status is required"),
        // parent_id: Yup.string().required("Parent Id is required"),
        // brands: Yup.array().required("Brand is required"),

    });

    const [loading,setLoading] = useState(true);
    // console.log("brands are",brand);
    // console.log("categories are",product);

    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("submit value",values.image);
            handleSubmit(values);


        }
    });
// if(defaultData.status === ''){
//     setLoading(!loading)
// }
// 25.30/57.23
// if(all_brands && all_cats && all_sellers){}
    useEffect(()=>{
        
        if(defaultData.status){
            let prod_data = defaultData;
            
            // if(typeof(defaultData['category']) === "string"){
            //     prod_data.category = defaultData['category']
            // }else{
            //     prod_data.category = defaultData['category']['_id']
            // }
            // if(typeof(defaultData['brand']) === "object"){
            //     let brand = defaultData.brand;
            //     // console.log("inside brand value",brand)
            //     if(brand.title){
            //         brand = {label:brand.title,value: brand._id}
            //     }
            //     prod_data.brand = brand;
            // }
            // if(typeof(defaultData['seller']) === "string"){
            //     prod_data.seller = defaultData['seller'];
            //     // console.log("inside brand value",brand)
            // }else{
            //     prod_data.seller = defaultData['seller']['_id']
            // }
            if(prod_data.status){
                prod_data.status = prod_data.status;
            }
            if(prod_data.is_paid){
                prod_data.is_paid = prod_data.is_paid;
                // console.log("prodDataimg",prod_data.image);
            }
            // console.log("prod:",prod_data);
             formik.setValues(prod_data);
            //  console.log("after_prod,",formik.values);
            // formik.setValues(defaultData)
        }

    },[defaultData,loading])
    //   console.log("Formik values-image",formik.values.image)
    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
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
                                    <option onClick={(e) => e.preventDefault()}>---Select Any One----</option>
                                    <option value="new">New Order</option>
                                    <option value="pending">Pending Order</option>
                                    <option value="cancelled">Cancelled Order</option>
                                    <option value="delivered">Delivered Order</option>
                                    

                                </Form.Select>
                                {
                                    formik.errors.status && <em className="text-danger">{formik.errors.status}</em>
                                }
                            </Col>
                        </Form.Group>

                <Form.Group className="row-mb-3" controlId="is_paid">
                    <Row>
                        <Col sm={3}>
                            <Form.Label >Is Paid: </Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Check
                                type="checkbox"
                                label="Paid"
                                name="is_paid"
                                value={1}
                                onChange={formik.handleChange}
                                checked={formik.values.is_paid}
                            />
                            {
                                formik.errors.is_paid && <em className="text-danger">{formik.errors.is_paid}</em>
                            }
                        </Col>
                    </Row>
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