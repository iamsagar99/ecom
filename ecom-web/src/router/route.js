// import { useState } from "react";
// import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AdminPages from "../pages/cms/admin";
import { Front } from "../pages/front";
import AdminLayout from "../pages/layout/admin.layout";
import HomeLayout from "../pages/layout/home.layout";
// import { getVerified } from "../services/auth.service";
import store from "../store";
import { Provider,useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../reducers/user.reducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react";
import { useCallback } from "react";
import { postRequest } from "../services/axios.service";
import { syncLocalCart } from "../reducers/cart.reducer";


const AdminPrivateRoute =  ({component}) =>{
    let localUser = JSON.parse(localStorage.getItem('auth_user'))

    const dispatch = useDispatch();


    if(!localUser){
        return <Navigate to="/login" />
    }else{
        let auth_token = localStorage.getItem("auth_token");
        if(!auth_token){
            localStorage.removeItem("auth_user")
            return <Navigate to="/login" />

        } else{
            dispatch(setUserDetail(localUser))
            return component;
        }
    }
     
}


const Checkout = () =>{
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const cart = useSelector((store)=>{
        return store.cart.cartDetail;
    })
    const submitCheckout = useCallback(async ()=>{
        try{

            let response = await postRequest('/cart/create',cart,true)
            if(response.status){
                console.log("response-cart",cart);
                toast.success(response.msg);
                dispatch(syncLocalCart());
                localStorage.removeItem('cart');
                navigate('/');
            
            }
            else{
                toast.error(response.msg)
            }
        }catch(error){
            console.log(error);
        }
    },[])
    useEffect(()=>{
        submitCheckout();
    },[submitCheckout])
    return(<></>)
}

const RoutingComponent = () => {
    return (
        <>
            <BrowserRouter>
            <ToastContainer autoClose={2000}/>
                <Provider store={store}>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Front.HomePage />} />
                        <Route path="login" element={<Front.LoginPage />}></Route>
                        <Route path="register" element={<Front.RegisterPage />}></Route>

                        <Route path="category/:slug" element={<Front.CategoryDetailPage />} />
                        <Route path="category/parent/:slug" element={<Front.ParentCategoryDetailPage />} />
                        <Route path="brand/:slug" element={<Front.BrandDetailPage />} />
                        <Route path="product/:slug" element={<Front.ProductDetailPage />} />
                        <Route path="cart" element={<Front.CartDetailPage/>}/>
                        <Route path="checkout" element={<AdminPrivateRoute component={<Checkout/>}/>}/>
                        <Route path="*" element={<Front.ErrorPage />}></Route>
                    </Route>
                    <Route path="/admin" element={<AdminPrivateRoute component={<AdminLayout/>}/>}>
                        <Route index element={<AdminPages.AdminDashBoard/>}/>

                        <Route path = "banner" element={<AdminPages.BannerPage/>}/>
                        <Route path="banner/create" element={<AdminPages.BannerCreate/>}/>
                        <Route path="banner/:id" element={<AdminPages.BannerEdit/>}/>

                        <Route path ="brand" element={<AdminPages.BrandPage/>}/>
                        <Route path="brand/create" element={<AdminPages.BrandCreate/>}/>
                        <Route path="brand/:id" element={<AdminPages.BrandEdit/>}/>

                        <Route path ="category" element={<AdminPages.CategoryPage/>}/>
                        <Route path="category/create" element={<AdminPages.CategoryCreate/>}/>
                        <Route path="category/:id" element={<AdminPages.CategoryEdit/>}/>

                        <Route path ="user" element={<AdminPages.UserPage/>}/>
                        <Route path="user/create" element={<AdminPages.UserCreate/>}/>
                        <Route path="user/:id" element={<AdminPages.UserEdit/>}/>


                        <Route path ="product" element={<AdminPages.ProductPage/>}/>
                        <Route path="product/create" element={<AdminPages.ProductCreate/>}/>
                        <Route path="product/:id" element={<AdminPages.ProductEdit/>}/>

                        <Route path ="order" element={<AdminPages.OrderPage/>}/>
                        <Route path="order/:id" element={<AdminPages.OrderEdit/>}/>

                    </Route>
                </Routes>
                </Provider>
                
            
                    
              
            </BrowserRouter>
        </>
    )
}
export default RoutingComponent;