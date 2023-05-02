import { Form, Row, Col, Button, Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify";
import Select from 'react-select'
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import * as Yup from "yup"
import "yup-phone"
import { createUser } from "../../services/user.service";

const RegisterPage = () => {

    let roles = [
        { value: "customer", label: "Buyer" },
        { value: "seller", label: "Seller" }
    ]

    const registerValidationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short Name!')
            .max(50, 'Too Long Name!')
            .required('Name is Required'),

        email: Yup.string().email('Invalid email').required('Email is Required'),
        password: Yup.string().min(8, "Password must be 8 character long").required('Password is Required'),
        role: Yup.array().of(Yup.string(["seller", "customer"])).required("Role is required"),
        phone: Yup.number().min(1000000000, "Number should be of 10 digits").max(9999999999, "Number should be of 10 digits").required("Phone is required")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: [],
            phone: "",
            address_shipping_address: "",
            address_shipping_house_no: "",
            address_billing_address: "",
            address_billing_house_no: "",
            image: ""
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            try{
                if (values.role.length <= 0) {
                    formik.setErrors({
                        ...formik.errors,
                        role: "Role is required"
                    })
                }
                 console.log(values);
                let result = await createUser(values);
                console.log(result)
            }catch(err){
                console.log(err);
            }
        }
    });


    return (
        <>
            <Container  >
                <ToastContainer />
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
                                        size={"sm"}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.email && <em className="text-danger">{formik.errors.email}</em>
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="password">
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required={true}
                                        size={"sm"}
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.password && <em className="text-danger">{formik.errors.password}</em>
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3" controlId="role">
                                <Form.Label className="col-sm-3">Role: </Form.Label>
                                <Col sm={9}>
                                    <Select
                                        options={roles}
                                        isMulti
                                        required
                                        name="role"
                                        onChange={(selectedOptions) => {
                                            let roles = [];
                                            selectedOptions.forEach((item) => {
                                                roles.push(item.value)
                                            })
                                            formik.setValues({
                                                ...formik.values,
                                                role: roles
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
                                        onChange={formik.handleChange}
                                    />
                                    {
                                        formik.errors.address_billing_house_no && <em className="text-danger">{formik.errors.address_billing_house_no}</em>
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formFileSm" className="row mb-3">
                                <Form.Label className="col-sm-3">Image:</Form.Label>
                                <div className="col-sm-6">
                                <Form.Control type="file" size="sm"  name="image" onChange={(e)=>{
                                    let file = e.target.files[0];
                                    formik.setValues({
                                        ...formik.values,
                                        image: file
                                    })
                                }}/>
                                </div>
                                <div className="col-sm-3">
                                    <img src={formik.values.image && URL.createObjectURL(formik.values.image)} className="img img-fluid"  />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" />
                            </Form.Group>
                            <Button variant="danger" type="reset" size="sm" className="me-3" onClick={formik.resetForm}>Cancel</Button>
                            <Button variant="success" type="submit" size="sm">Register</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default RegisterPage;