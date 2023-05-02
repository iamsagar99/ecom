import "bootstrap/dist/css/bootstrap.min.css"
import { toast, ToastContainer } from 'react-toastify';
import { useState } from "react"
import {  Form,  Col, Button } from "react-bootstrap"
import 'react-toastify/dist/ReactToastify.css';
import {postRequest} from '../../services/axios.service'
import { useNavigate } from "react-router-dom"
import { useEffect, React } from "react";
import { getVerified, login } from "../../services/auth.service";


const LoginPage = () => {

    let defaultData = {
        email: "",
        password: ""
    }

    let [data, setData] = useState(defaultData);
    let [err, setErr] = useState(defaultData);
    let navigate = useNavigate();

    const validateData = ({ name, value, required }) => {
        let err_msg = null;
        switch (name) {
            case "email":
                err_msg = (required && !value) ? "Email is required" : null;
                break;
            case "password":
                err_msg = (required && !value) ? "Password is required" : (value.length < 8) ? "Password Must be atleast 8 characters" : null;
                break;
            default:
                break;
        }
        setErr({
            ...err,
            [name]: err_msg
        })
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })
        validateData(e.target);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await login(data);
            // console.log("response is:",response)
            
            if (response.status) {
                toast.success(response.msg);
                navigate("/" + response.result.user.role[0])
            }
            else {
                toast.error(response.msg);
            }
        }
        catch (msg) {
            // toast.error(msg)
        }
    }

   
    useEffect(() => {
        // localStorage.clear()
        let token = localStorage.getItem('auth_token');
        let user = JSON.parse(localStorage.getItem('auth_user'))
        if (!token || !user) {
            localStorage.clear();
        }
        else {
            navigate("/" + user.role)
        }
    }, [navigate])
    return (
        <>
        {/* <ToastContainer autoClose={1500} /> */}
            <section id="pricing" className="pricing">
                <div className="container" data-aos="fade-up">

                    <div className="section-title mt-5">
                        <h2>Login Page</h2>
                        {/* <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p> */}
                    </div>

                    <div className="row">

                        <div className="col-lg-4 col-md-6 mx-auto" data-aos="zoom-im" data-aos-delay="100">
                            <div className="box">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="row mb-3" controlId="email">
                                        <Form.Label className="col-sm-3">Email: </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                required={true}
                                                size={"sm"}
                                                onChange={handleChange}
                                            />
                                            <em className="text-danger">{err?.email}</em>


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
                                                onChange={handleChange}
                                            />
                                            <em className="text-danger">{err?.password}</em>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" />
                                    </Form.Group>
                                    <Button variant="danger" type="reset" size="sm" className="me-3">Cancel</Button>
                                    <Button variant="success" type="submit" size="sm">Login</Button>
                                </Form>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>


    )
}

export default LoginPage;