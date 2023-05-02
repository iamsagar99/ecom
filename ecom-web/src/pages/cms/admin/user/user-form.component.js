import { Form, Button, Col,Row,Container } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";
import Select from 'react-select'


export const UserForm = ({defaultData,handleSubmit,edit}) => {
    
    let roles = [
        { value: "admin", label: "Admin" },
        { value: "customer", label: "Buyer" },
        { value: "seller", label: "Seller" }
    ]
    const validationSchema = Yup.object().shape({
        name: Yup.string()
        .min(2, 'Too Short Name!')
        .max(50, 'Too Long Name!')
        .required('Name is Required'),

    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(8, "Password must be 8 character long").required('Password is Required'),
    role: Yup.object().nullable(),
    phone: Yup.number().min(1000000000, "Number should be of 10 digits").max(9999999999, "Number should be of 10 digits").required("Phone is required"),
    status: Yup.string(["active", "inactive"]).required("Status is required"),
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
            let sel_roles = defaultData.role.map((item)=>{
                return {
                    value: item, 
                    label:  (item === "customer" ? "Buyer" :(item === "admin" ? "Admin" : "Seller"))
                }
            })
            formik.setValues({
                ...defaultData,
                address_shipping_address: defaultData?.address?.shipping.address,
                address_shipping_house_no: defaultData?.address?.shipping.house_no,
                address_billing_address: defaultData?.address?.billing.address,
                address_billing_house_no: defaultData?.address?.billing.house_no,

                role: sel_roles
            })
        }
    },[defaultData])

    return (
        <>
            <Container  >
                <Row>
                    <Col sm={12} md={{
                        offset: 1,
                        span: 9
                    }}>
                        <h4 className="text-center">Register Page</h4>
                        <hr />
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3" controlId="name">
                                <Form.Label className="col-sm-3">Name: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.name && <em className="text-danger">{formik.errors.name}</em>
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="email">
                                <Form.Label className="col-sm-3">Email: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required={true}
                                        readOnly={edit}
                                        size={"sm"}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.email && <em className="text-danger">{formik.errors.email}</em>
                                    }
                                </Col>
                            </Form.Group>
                            {
                                !edit && 
                                <Form.Group className="row mb-3" controlId="password">
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.password && <em className="text-danger">{formik.errors.password}</em>
                                    }
                                </Col>
                            </Form.Group>
                            }
                            <Form.Group className="row mb-3" controlId="role">
                                <Form.Label className="col-sm-3">Role: </Form.Label>
                                <Col sm={9}>
                                    <Select
                                        options={roles}
                                        isMulti
                                        required
                                        name="role"
                                        value={formik.values.role}
                                        onChange={(selectedOptions) => {
                                            // let roles = [];
                                            // selectedOptions.forEach((item) => {
                                            //     roles.push(item.value)
                                            // })
                                            formik.setValues({
                                                ...formik.values,
                                                role: selectedOptions
                                            })
                                        }}
                                    />
                                    {
                                        formik.errors.role && <em className="text-danger">{formik.errors.role}</em>
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="phone">
                                <Form.Label className="col-sm-3">Phone: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your Phone"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.phone && <em className="text-danger">{formik.errors.phone}</em>
                                    }
                                </Col>
                            </Form.Group>

                             <Form.Group className="row mb-3" >
                                <Form.Label className="col-sm-3">Shipping Address: </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        name="address_shipping_address"
                                        id="address_shipping_address"
                                        placeholder="Enter your Shipping Address"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.address_shipping_address}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.address_shipping_address && <em className="text-danger">{formik.errors.address_shipping_address}</em>
                                    }
                                </Col>
                                <Col sm={4}>
                                    <Form.Control
                                        type="text"
                                        name="address_shipping_house_no"
                                        id="address_shipping_house_no"

                                        placeholder="Enter your shipping House Number"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.address_shipping_house_no}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.address_shipping_house_no && <em className="text-danger">{formik.errors.address_shipping_house_no}</em>
                                    }
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Billing Address: </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        name="address_billing_address"
                                        id="address_billing_address"
                                        placeholder="Enter your Billing Address"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.address_billing_address}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.address_billing_address && <em className="text-danger">{formik.errors.address_billing_address}</em>
                                    }
                                </Col>
                                <Col sm={4}>
                                    <Form.Control
                                        type="text"
                                        name="address_billing_house_no"
                                        id="address_billing_house_no"
                                        placeholder="Enter your billing House Number"
                                        required={true}
                                        size={"sm"}
                                        value={formik.values.address_billing_house_no}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.address_billing_house_no && <em className="text-danger">{formik.errors.address_billing_house_no}</em>
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
                            <option >---Select Any One----</option>
                            <option value="inactive">Inactive</option>
                            <option value="active">Active</option>

                        </Form.Select>
                        {
                            formik.errors.status && <em className="text-danger">{formik.errors.status}</em>
                        }
                    </Col>
                </Form.Group>
                <Form.Group controlId="formFileSm" className="row mb-3">
                    <Form.Label className="col-sm-3">Image:</Form.Label>
                    <div className="col-sm-6">
                        <Form.Control type="file" size="sm" name="image" 
                        // required={formik.values.image ? false : true} 
                        onChange={(e) => {
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
                        <img src={process.env.REACT_APP_IMAGE_URL+"/user/"+formik.values.image} className="img img-fluid" />

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
                    </Col>
                </Row>
            </Container>
        </>
    )
}