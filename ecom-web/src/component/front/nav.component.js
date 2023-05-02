import { useEffect } from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import img from "../../assets/image/logo1.png"
import "../../assets/css/nav.css"
// import {useSelector} from "react-redux"


export const MenuComponent = () => {
  
  const localUser = JSON.parse(localStorage.getItem("auth_user"))
  const navigate = useNavigate();
  let [totalItems,setTotalItems] = useState(0);
  let total = useSelector((store)=>{

   let items = 0
    store.cart.cartDetail.map((item)=>{
      items = Number(items) + Number(item.qty);
    })
    return items;

  })

  useEffect(()=>{
    setTotalItems(total)
  },[total])
console.log("totalItems",totalItems);
  return (
    <Navbar bg="light" variant="light">
      <Container>
        {/* <Navbar.Brand href="/"></Navbar.Brand> */}
        <a href="/"><img src={img} alt="" className=' bimg' /></a>
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">Home</NavLink>
          {
            !localUser && <>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </>
          }
        </Nav>
        <Nav>
          <NavLink className = "nav-link" to={"/cart"}>Cart<i className="fa-solid fa-cart-shopping"></i>{totalItems}</NavLink>
        {
          localUser && <>
          <NavLink className="nav-link" to={"/"+localUser.role[0]}>{localUser.name}</NavLink>
          <NavLink className="nav-link" to="/login" onClick={(e)=>{
            e.preventDefault();
            localStorage.removeItem("auth_user");
            localStorage.removeItem("auth_token");
            navigate("/login")

          }}>LogOut</NavLink>

          </>
        }
        </Nav>
      </Container>
    </Navbar>
  );
}