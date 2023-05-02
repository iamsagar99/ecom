import { Form, Button, Col, Row, Container } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from 'yup';
// import { useEffect } from "react";
import { toast } from "react-toastify";
import Select from 'react-select'
import { createUser } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { getVerified, login } from "../../services/auth.service";



const LoginPage = () => {
    const navigate = useNavigate();
    let defaultData = {
        email: "",
        password: "",

    }
    const validationSchema = Yup.object().shape({

        email: Yup.string().email('Invalid email').required('Email is Required'),
        password: Yup.string().min(8, "Password must be 8 character long").required('Password is Required'),
    });
    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {

                let response = await login(values);
                console.log("response", response);
                if (response.access_token) {
                    toast.success(response.msg);
                    navigate("/" + response.user.role[0])
                } else {
                    toast.error(response.msg)
                }
            } catch (error) {
                console.log(error)
            }
        }
    });


    return (
        <>
            <Container  >
                <Row>
                    <Col sm={12} md={{
                        offset: 1,
                        span: 9
                    }}>
                        <h4 className="text-center mt-5">Login Page</h4>
                        <hr />
                        <Container className="m-5 p-5">
                            <Form onSubmit={formik.handleSubmit}>

                                <Form.Group className="row mb-3" controlId="email">
                                    <Form.Label className="col-sm-3">Email: </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            required={true}
                                            size={"sm"}
                                            value={formik.values.email}
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
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                        {
                                            formik.errors.password && <em className="text-danger">{formik.errors.password}</em>
                                        }
                                    </Col>
                                </Form.Group>
                                <Form.Group className="row  mb-3">
                                    <Col sm={{ offset: 3, span: 9 }}>
                                        <Button variant="danger" type="reset" size="sm" className="me-3" onClick={formik.resetForm}>Cancel <i className="fa fa-trash"></i></Button>
                                        <Button variant="success" type="submit" size="sm">Submit <i className="fa fa-paper-plane"></i></Button>

                                    </Col>
                                </Form.Group>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default LoginPage;