import { Form, Button, Col, Row } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";
import Select from 'react-select'
import { getCategoryByType } from "../../../../services/category.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { getLabelByType } from "../../../../services/label.service";
import { getUserByRole } from "../../../../services/user.service";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useSelector} from "react-redux"

export const ProductCreateForm = ({ defaultData, handleSubmit }) => {

    let logged_in_user = useSelector((store)=>{
        return store.user.userDetail;
    })


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        // status: Yup.array().of(Yup.string(["active", "inactive"])).required("Status is required"),
        // status: Yup.string().required("Status is required"),
        // parent_id: Yup.string().required("Parent Id is required"),
        // brands: Yup.array().required("Brand is required"),

    });
    const [all_brands, setBrand] = useState();
    // const [product, setProduct] = useState();
    const [all_sellers, setSellers] = useState();
    const [all_cats, setCategory] = useState();
    const [loading,setLoading] = useState(true);
    // console.log("brands are",brand);
    // console.log("categories are",product);

    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //  console.log(values);
            handleSubmit(values);
            // if (values.brand) {
            //     values.brand = values.brand.map((item) => item.value)
            // }
            // if (values.brand.length <= 0) {
            //     formik.setErrors({
            //         ...formik.errors,
            //         brand: "Brand is required"
            //     })
            // } else {
                
            //     // handleSubmit(values);
            // }
            // console.log(values)


        }
    });

    // const getAllProduct = async ()=>{
    //     try{
    //         let response = await getProductByType('product');
    //        if(response.status){
    //         setProduct(response.result)

    //        }
    //        else{
    //         toast.error(response.msg)
    //        }
    //     }catch(err){
    //         throw err
    //     }
    // }

    const getAllBrands = async () => {
        try {
            let response = await getLabelByType('brand');
            // console.log("banner response:",response);
            let brands = response.result.map((item) => {
                return {
                    label: item.title,
                    value: item._id
                }
            })
            if (response.status) {
                setBrand(brands)
            }
            else {
                toast.error(response.msg)
            }
        } catch (err) {
            console.log(err)
            toast.error(err)
        } finally{
            setLoading(!loading)
        }
    }

    const getAllSellers = async () => {
        try {
            let all_user = await getUserByRole('seller')
            // console.log("waiting.....");
            // console.log("seller user:",all_user);
            setSellers(all_user.result)
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(!loading)
        }
    }
    const getAllCategory = async () => {
        try {
            let response = await getCategoryByType('category');
            if (response.status) {
                setCategory(response.result)
                // console.log("category",response.result);
            }
            else {
                toast.error(response.msg)
            }
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(!loading)
        }
    }

    useEffect(() => {
        // getAllProduct();
        getAllBrands();
        getAllCategory();
        getAllSellers();

    }, [defaultData])
// 25.30/57.23
    useEffect(()=>{
        if(defaultData.title){
            let prod_data = defaultData;
            // console.log(defaultData)
            // // if(prod_data.category){
            // //     prod_data.category = prod_data.category._id
            // // }
            // if(typeof(defaultData['category']) === "string"){
            //     prod_data.category = defaultData['category']
            // }else{
            //     prod_data.category = defaultData['category']['_id']
            // }
            // if(typeof(defaultData['brand']) === "object"){
            //     let brand = defaultData.brand;
            //     if(brand.title){
            //         brand = {label:brand.title,value: brand._id}
            //     }
            //     prod_data.brand = brand;
            // }
            // if(prod_data.seller){
            //     prod_data.seller = prod_data.seller._id;
            // }
            // if(prod_data.images){
            //     prod_data.image = prod_data.images
            // }
            // console.log("prod:",prod_data);
            // formik.setValues(prod_data)
            formik.setValues(defaultData)
        }

    },[defaultData,loading])
    // console.log("Formik values",formik.values)
    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="row mb-3" controlId="title">
                    <Form.Label className="col-sm-3">Title: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Product Title"
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
                <Form.Group className="row mb-3" controlId="description">
                    <Form.Label className="col-sm-3">Description: </Form.Label>
                    <Col sm={9}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formik.values.description}
                            name="description"
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                formik.setValues({
                                    ...formik.values,
                                    description: data
                                })
                            }}

                        />
                        {
                            formik.errors.description && <em className="text-danger">{formik.errors.description}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="category">
                    <Form.Label className="col-sm-3">Category: </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="category"
                            required={true}
                            onChange={formik.handleChange}
                            size="sm"
                            value={formik.values.category}

                        >
                            <option >---Select Any One----</option>
                            {
                                all_cats && all_cats.map((item, key) => (

                                    <option value={item._id} key={key}>{item.title}</option>
                                ))
                            }

                        </Form.Select>
                        {
                            formik.errors.category && <em className="text-danger">{formik.errors.category}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="price">
                    <Form.Label className="col-sm-3">Price: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Enter Product Price"
                            required={true}
                            size={"sm"}
                            min={0}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.price && <em className="text-danger">{formik.errors.price}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="discount">
                    <Form.Label className="col-sm-3">Discount (%): </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="number"
                            name="discount"
                            placeholder="Enter Product discount"
                            required={true}
                            size={"sm"}
                            min={0}
                            max={98}
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.discount && <em className="text-danger">{formik.errors.discount}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="brand">
                    <Form.Label className="col-sm-3">Brand: </Form.Label>
                    <Col sm={9}>
                        <Select
                            options={all_brands}
                            required
                            name="brand"
                            value={formik.values.brand}
                            onChange={(e) => {
                                formik.setValues({
                                    ...formik.values,
                                    brand: e
                                })
                            }}
                        />
                        {
                            formik.errors.brand && <em className="text-danger">{formik.errors.brand}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group className="row mb-3" controlId="seller">
                    <Form.Label className="col-sm-3">Seller: </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="seller"
                            required={true}
                            onChange={formik.handleChange}
                            size="sm"
                            value={formik.values.seller}

                        >
                            <option >---Select Any One----</option>
                            {
                                all_sellers && all_sellers.map((item, key) => (

                                    <option value={item._id} key={key}>{item.name}</option>
                                ))
                            }

                        </Form.Select>
                        {
                            formik.errors.seller && <em className="text-danger">{formik.errors.seller}</em>
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
                                    <option onClick={(e) => e.preventDefault()}>---Select Any One----</option>
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

                <Form.Group className="row-mb-3" controlId="is_featured">
                    <Row>
                        <Col sm={3}>
                            <Form.Label >Featured: </Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Check
                                type="checkbox"
                                label="Is Featured"
                                name="is_featured"
                                value={1}
                                onChange={formik.handleChange}
                                checked={formik.values.is_featured}
                            />
                            {
                                formik.errors.is_featured && <em className="text-danger">{formik.errors.is_featured}</em>
                            }
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="formFileSm" className="row mb-3">
                    <Form.Label className="col-sm-3">Images:</Form.Label>
                    <Col sm={3}>

                        <Form.Control type="file" multiple size="sm" name="image" required={formik.values.image ? false : true} onChange={(e) => {
                            // let file = e.target.files; it gives object of object
                            // to convert object of object to array following method should be followed
                            let file = Object.values(e.target.files);

                            formik.setValues({
                                ...formik.values,
                                image: file
                            })
                        }} />
                        {
                            // 38/56:38  .. yo file rakhya mileko xaina ... 38:34 instance check garne
                            formik.errors.image && <em className="text-danger">{formik.errors.image}</em>
                        }
                    </Col>

                </Form.Group>

                <Row>

                    {
                        formik.values.image ?
                            (
                                formik.values.image.map((img, key) => (
                                    <Col sm={1} key={key}>
                                        {typeof (img) === "string" ?
                                            <img src={process.env.REACT_APP_IMAGE_URL + "/product/" + img} alt="" className="img img-fluid img-thumbnail mb-2" />

                                            :
                                            <img src={URL.createObjectURL(img)} alt="" className="img img-fluid img-thumbnail mb-2" />
                                        }
                                    </Col>
                                ))
                            )
                            :
                            <></>
                    }

                </Row>

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
