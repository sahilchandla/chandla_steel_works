import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import './App.css';
import { ToastContainer } from 'react-toastify';
import AddProducts from './Pages/addProducts';
import PrivateComponent from './Pages/PrivateComponent';
import Products from './Pages/Products';
import Update from './Pages/Update';
import AdminRoute from './Pages/AdminRoute';
import UserQuery from './Pages/UserQuery';
import Cart from './Pages/Cart';
import CheckOut from './Pages/CheckOut';
import Payment from './Pages/Payment';
import AdminOrders from './Pages/AdminOrders';
import ProductImgDetails from './Pages/ProductImgDetails';
function App() {
  return (
    <div className='app'>

      <Navbar />

      <div className="main-content">

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          <Route path="/product/:id" element={<ProductImgDetails />} />

          {/* ADMIN / PRIVATE ROUTES */}

          <Route element={<PrivateComponent />}>

            <Route  path="/addproducts" element={<AdminRoute> <AddProducts /></AdminRoute> }/>

            <Route path="/editproducts/:id"element={ <AdminRoute> <Update />  </AdminRoute> }/>
            
            <Route path='/query' element={<AdminRoute> <UserQuery /> </AdminRoute> } />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<CheckOut /> } />

            <Route path="/payment" element={<Payment />} />

            <Route path="/orders" element ={<AdminOrders/>} />

            

          </Route>

        </Routes>

        <ToastContainer position='top-right' />

      </div>

      <Footer />

    </div>
  )
}

export default App
