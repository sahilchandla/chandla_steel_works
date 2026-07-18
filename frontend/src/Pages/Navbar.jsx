import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
// import logo from '../assets/logo.png';
function Navbar() {

  const cart = useSelector(state => state.cart);    //Pura cart object lena.    //useSelector is a hook that allows us to access the state of the cart from the redux store. state.cart is the cart slice of the redux store. we can access the items, totalQuantity and totalAmount from the cart slice. we can use this cart data to display the number of items in the cart and the total amount in the navbar.
  //  we can also use this cart data to display the cart items in the cart page. we can also use this cart data to update the cart items and total quantity and total amount when we add or remove items from the cart. we can also use this cart data to display the cart items in the checkout page. we can also use this cart data to display the order summary in the order confirmation page.
  // console.log("cart in navbar:", cart)

  const totalQuantity = useSelector(
    (state) => state.cart.totalQuantity
  );

  let [menuOpen, setMenuOpen] = useState(false);
  let [adminOpen, setAdminOpen] = useState(false);


  let auth = localStorage.getItem("user");
  let user = auth ? JSON.parse(auth) : null;  //string -> object
  let role = user?.role;
  let navigate = useNavigate();
  let logout = () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <nav className='navbar-main'>
      {/* LOGO */}

      {/* <div className='logo-section'>

        <Link to="/" className='logo-link'>

          <img
            src={logo}
            alt="logo"
            className='logo-img'
          />

          <h2>Steel Works</h2>

        </Link>

      </div> */}

      <div className="brand-logo">
        <h1 className="brand-top">CHANDLA'S</h1>
        <p className="brand-bottom">STEEL WORKS</p>
      </div>

      {/* TOGGLER */}

      <div
        className='menu-icon'
        onClick={() => setMenuOpen(!menuOpen)}
      >

        {
          menuOpen ? <FaTimes /> : <FaBars />
        }

      </div>

      {auth ? (

        //  ADMIN NAVBAR
        role === "admin" ? (
          <ul className={menuOpen ? "list active" : "list"}>
            <li><Link to="/">Home</Link></li>

            <li><Link to="/addproducts">AddProducts</Link></li>

            <li><Link to="/products">Products</Link></li>

            <li style={{ position: "relative", cursor: "pointer", fontSize: "25px" }}
              onClick={() => setAdminOpen(!adminOpen)}
              onMouseEnter={() => setAdminOpen(true)} onMouseLeave={() => setAdminOpen(false)}
              className='open-query-box'>Admin

              {
                adminOpen && (

                  <div className='query-box'>

                    <Link to="/query" style={{ textDecoration: "none", color: "white" }}>
                      <p style={{ border: "none", borderBottom: "1px solid orange" }}>Query Messages</p>
                    </Link>

                    <Link to="/orders" style={{ textDecoration: "none", color: "white" }}>
                      <p style={{ border: "none", borderBottom: "1px solid orange" }}>Customer Orders</p>
                    </Link>

                    <p onClick={logout} style={{ cursor: "pointer", color: "red" }} >
                      Logout ({user.name})
                    </p>

                  </div>

                )
              }

            </li>
          </ul>
        )

          //  USER NAVBAR
          : (
            <ul className={menuOpen ? "list active" : "list"}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li>
                <Link to="/cart">
                  <FaShoppingCart />
                  <span style={{ marginLeft: "5px" }}>
                    ({totalQuantity})
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={logout}>
                  Logout ({user.name})
                </Link>
              </li>
            </ul>
          )

      ) : (

        //  NOT LOGGED IN
        <ul className={menuOpen ? "list active" : "list"}>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>

      )}
    </nav>
  )
}

export default Navbar
