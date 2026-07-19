import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice.js";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function ProductImgDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(
        (state) => state.cart.items
    );
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {

            const { data } = await api.get(`/product/get/${id}`);

            setProduct(data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = () => {

        let auth = localStorage.getItem("user");

        if (!auth) {

            toast.warning(
                "Please login first!"
            );

            return;
        }

        const existingProduct =
            cartItems.find(
                (item) =>
                    item.id === product._id
            );

        if (existingProduct) {

            toast.info(
                "Product already exists in cart!"
            );

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

        toast.success(
            "Product added successfully!"
        );
    };

    return (
        <div className="container py-5">

            <div className="row bg-white rounded shadow p-4">

                {/* LEFT SIDE IMAGE */}

                <div className="col-md-6 text-center">

                    <img
                        src={product.image}
                        alt=""
                        className="img-fluid rounded"
                        style={{
                            maxHeight: "500px",
                            width: "100%",
                            objectFit: "cover"
                        }}
                    />

                </div>
                <br />

                {/* RIGHT SIDE DETAILS */}

                <div className="col-md-6">

                    <h1>{product.pname}</h1>

                    <hr />

                    <h3 className="text-success">
                        ₹ {product.price}
                    </h3>

                    <div className="d-flex align-items-center mb-3">
                        <span className="me-2">
                            <FaStar className="text-warning" />
                            <FaStar className="text-warning" />
                            <FaStar className="text-warning" />
                            <FaStar className="text-warning" />
                            <FaStarHalfAlt className="text-warning" />
                        </span>

                        <span className="text-muted">
                            4.5 (120 Reviews)
                        </span>
                    </div>

                    <p>
                        <strong>Company :</strong>
                        {" "}
                        {product.company}
                    </p>

                    <p>
                        <strong>Category :</strong>
                        {" "}
                        {product.category}
                    </p>

                    <p>
                        <strong>Description :</strong>
                    </p>

                    <p>
                        {product.description}
                    </p>

                    <div className="d-flex gap-3 mt-4">

                        <button
                            className="btn btn-dark"
                            onClick={() =>
                                navigate("/checkout", {
                                    state: { product }
                                })
                            }
                        >
                            Order Now
                        </button>

                        <button
                            className="btn btn-outline-dark"
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductImgDetails;