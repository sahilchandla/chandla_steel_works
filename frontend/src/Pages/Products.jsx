import React, { useEffect, useState } from 'react'
import { api } from './api';
import './Products.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaLayerGroup } from 'react-icons/fa';
import './Products.css';

import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice.js';

function Products() {

  const dispatch = useDispatch();

  let navigate = useNavigate();
  let [products, setProducts] = useState([]);

  let [currentPage, setCurrentPage] = useState(1);
  let productsPerPage = 5;

  let token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("user"));
  let role = user?.role;
  let getApi = async () => {
    try {
      let { data } = await api.get("/product/get", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(data)
      setProducts(data);
    }
    catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getApi();
  }, []);

  let handleDelete = async (id) => {
    // console.log(id)
    try {
      let { data } = await api.delete(`/product/remove/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      )
      // console.log(data)
      toast.success(data.message, { autoClose: 3000 })
      if (data.success) {
        setProducts(products.filter(item => item._id !== id));
      }
    }
    catch (err) {
      toast.error("products not deleted")
    }

  }

  let searchChange = async (e) => {
    // console.log(e)
    let key = e.target.value;
    // console.log(key);
    if (key) {
      let { data } = await api.get(`/product/search/${key}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      console.log(data)
      if (data.success) {
        setProducts(data.data)
      }
      else {
        getApi();
      }
    }
  }

  let lastIndex = currentPage * productsPerPage;

  let firstIndex = lastIndex - productsPerPage;

  let currentProducts = products.slice(firstIndex, lastIndex);

  let totalPages = Math.ceil(products.length / productsPerPage);

  let handleOrder = (product) => {
    let auth = localStorage.getItem("user");
    if (!auth) {
      toast.warning("Please login to order products.", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    // toast.info("Order functionality coming soon!", { autoClose: 2000 });

    navigate("/checkout", { state: { product } });
  }
  let handleAddToCart = (product) => {
    console.log("Added to cart:", product)
    let auth = localStorage.getItem("user");

    //User Must be logged in first.
    if (!auth) {
      toast.warning("Please login to add products to cart.", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    dispatch(
      addItem({
        id: product._id,
        name: product.pname,
        price: product.price,
        image: product.image,
        quantity: 1,
        totalPrice: product.price
      })
    );

    toast.info("Product added to cart Successfully", { autoClose: 2000 });
  }

  return (
    <div className="container py-5">

      {/* <h1 className="text-center mb-5">
        Products
      </h1> */}



      {/* SEARCH BAR */}

      <div className="row justify-content-center mb-5 mt-4 search-bar">

        <div className="col-md-6">

          <input
            type="search"
            placeholder="Search Product..."
            className="form-control form-control-lg"
            onChange={searchChange}
          />

        </div>

      </div>

      <div className="text-center mb-5">
        <h2 style={{ fontWeight: "bold" }}>Our <span style={{ color: "orange" }}>Products</span></h2>
        <span style={{ display: 'block', width: '50%', height: '2px', backgroundColor: 'orange', margin: '0 auto 20px' }}><hr />
        </span>
        <p className="text-muted" style={{ fontWeight: "300", fontSize: "25px" }}>High Quality Steel Solutions For Your Home and Business. </p>
      </div>

      {/* ADMIN UI */}

      {
        role === "admin" ?
          (
            <div>
              <div className="table-responsive">

                <table className="table table-bordered table-hover text-center align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Delete</th>
                      <th>Edit</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      products.length > 0 ? (

                        currentProducts.map((items, index) => (

                          <tr key={items._id}>

                            <td>{firstIndex + index + 1}</td>
                            <td>{items.pname}</td>
                            <td>{items.company}</td>
                            <td>{items.category}</td>
                            <td>{items.price}</td>

                            <td>

                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(items._id)}
                              >
                                Delete
                              </button>

                            </td>

                            <td>

                              <Link
                                to={`/editproducts/${items._id}`}
                                className="btn btn-success"
                              >
                                Edit
                              </Link>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td colSpan="7">
                            No Products Found
                          </td>

                        </tr>

                      )
                    }

                  </tbody>

                </table>

              </div>

              {/* PAGINATION BUTTONS */}

              <div className="d-flex justify-content-end mt-4 gap-2 flex-wrap">

                <button
                  className="btn btn-dark btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>

                {
                  [...Array(totalPages)].map((_, index) => (

                    <button
                      key={index}
                      className={`btn btn-sm ${currentPage === index + 1
                        ? "btn-primary"
                        : "btn-outline-dark"
                        }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>

                  ))
                }

                <button
                  className="btn btn-dark btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>

              </div>


              {/* PRODUCTS BOX*/}
              <div className="d-flex gap-3 flex-wrap mb-4 mt-5 justify-content-center">
                <div
                  className="text-white rounded-4 shadow-sm d-flex flex-column justify-content-center align-items-center"
                  style={{
                    width: "130px",
                    height: "130px",
                    background: "linear-gradient(135deg, #000000, #1f2937)"
                  }}
                >

                  <div
                    className="bg-white text-dark rounded-circle d-flex justify-content-center align-items-center mb-2"
                    style={{
                      width: "40px",
                      height: "40px"
                    }}
                  >

                    <FaBoxOpen size={20} />

                  </div>

                  <small className="fw-light">
                    Products
                  </small>

                  <h4 className="fw-bold m-0">
                    {products.length}
                  </h4>

                </div>


                {/* CATEGORIES BOX*/}

                <div
                  className="text-white rounded-4 shadow-sm d-flex flex-column justify-content-center align-items-center"
                  style={{
                    width: "130px",
                    height: "130px",
                    background: "linear-gradient(135deg, #000000, #1f2937)"
                  }}
                >

                  <div
                    className="bg-white text-dark rounded-circle d-flex justify-content-center align-items-center mb-2"
                    style={{
                      width: "40px",
                      height: "40px"
                    }}
                  >

                    <FaLayerGroup size={20} />

                  </div>
                  <small className="mt-1">
                    Categories
                  </small>
                  <h4 className="fw-bold m-0">8</h4>
                </div>
              </div>
            </div>
          ) : (

            // USER CARD UI

            < div className="row">

              {
                products.length > 0 ? (

                  products.map((items) => (

                    <div
                      className="col-lg-4 col-md-6 mb-4"
                      key={items._id}
                    >

                      <div className="card product-card border-0 h-100">

                        {/* IMAGE */}

                        <div className="product-image-wrapper">

                          <img
                            src={items.image}
                            alt=""
                            className="card-img-top product-img"
                            onClick={() => navigate(`/product/${items._id}`)}
                          />

                        </div>

                        {/* DOTS */}

                        <div className="dots"></div>

                        {/* CARD BODY */}

                        <div className="card-body r">

                          <h3 className="card-title mb-3">
                            {items.pname}
                          </h3>

                          <ul className="list-group">

                            <li className="list-group-item">
                              <strong>Company :</strong> {items.company}
                            </li>

                            <li className="list-group-item">
                              <strong>Category :</strong> {items.category}
                            </li>

                            <li className="list-group-item">
                              <strong>Price :</strong>

                              <span
                                className="price-text"
                                style={{ color: "green" }}
                              >
                                ₹ {items.price}
                              </span>

                            </li>

                            {/* <li className="list-group-item">
                              <strong>Description :</strong> {items.description}
                            </li> */}

                          </ul>

                          {/* BUTTONS */}

                          <div className="d-grid gap-2 mt-4">

                            <button
                              className="btn order-btn"
                              onClick={() => handleOrder(items)}
                            >
                              Order Now
                            </button>

                            <button
                              className="btn cart-btn"
                              onClick={() => handleAddToCart(items)}
                            >
                              Add to Cart
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="text-center">

                    <h2>No Products Found</h2>

                  </div>

                )
              }
            </div>


          )
      }

    </div>
  )
}


export default Products
