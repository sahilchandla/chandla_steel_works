import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import "./Payment.css";
import { api } from "./api";

function Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const checkoutProducts = location.state?.checkoutProducts || []; //optional chaining operator.

    const customer = location.state?.customer;

    const totalAmount = location.state?.totalAmount;

    const totalItems = location.state?.totalItems;

    const token = localStorage.getItem("token")?.replace(/"/g, "");

    const [paymentMethod, setPaymentMethod] =
        useState("");

    useEffect(() => {

        console.log(customer);

        const hasCartItems =
            cart.items.length > 0;

        const hasDirectOrder =
            checkoutProducts.length > 0;

        if (!hasCartItems && !hasDirectOrder) {
            toast.error(
                "Please order a product first!"
            );
            navigate("/");
        }

    }, [cart, checkoutProducts, navigate]);

    const handlePayment = async () => {

        const hasCartItems = cart.items.length > 0;

        const hasDirectOrder = checkoutProducts.length > 0;

        if (!hasCartItems && !hasDirectOrder) {
            toast.error("No products found!");
            return;
        }

        if (!paymentMethod) {
            toast.warning("Please select a payment method!");
            return;
        }

        if (!customer) {
            toast.error("Customer details not found!");
            return;
        }

        try {
            console.log("sending Request...");

            const { data } = await api.post(

                "/orders/create",

                {

                    customer,

                    products: checkoutProducts,

                    totalItems,

                    totalAmount,

                    paymentMethod

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );
            console.log("Resposne :",data)

            toast.success(data.message);

            if (cart.items.length > 0) {
                dispatch(clearCart());
            }

            navigate("/");

        }

        catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Order Failed"

            );

        }

    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">

            <div
                className="card shadow-lg border-0 rounded-4 p-4"
                style={{ width: "500px" }}
            >
                <div className="text-center mb-4">
                    <div className="mb-3">
                        <i className="bi bi-credit-card-fill fs-1 badge-color"></i>
                    </div>
                    <h2 className="fw-bold mt-2">
                        Payment Method
                    </h2>
                    <p className="text-muted">
                        Choose your preferred payment option
                    </p>
                </div>

                <div className="list-group">

                    <label
                        className={`list-group-item list-group-item-action rounded-3 mb-3 px-2 shadow-sm ${paymentMethod === "COD"
                            ? "selected"
                            : ""
                            }`}
                    >
                        <input
                            className="form-check-input me-3"
                            type="radio"
                            name="payment"
                            value="COD"
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />
                        <i className="bi bi-truck me-2"></i>
                        Cash On Delivery
                    </label>

                    <label
                        className={`list-group-item list-group-item-action rounded-3 mb-3 px-2 shadow-sm ${paymentMethod === "UPI"
                            ? "selected"
                            : ""
                            }`}
                    >
                        <input
                            className="form-check-input me-3"
                            type="radio"
                            name="payment"
                            value="UPI"
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />
                        <i className="bi bi-phone me-2"></i>
                        UPI Payment
                    </label>

                    <label
                        className={`list-group-item list-group-item-action rounded-3 px-2 shadow-sm ${paymentMethod === "Card"
                            ? "selected"
                            : ""
                            }`}
                    >
                        <input
                            className="form-check-input me-3"
                            type="radio"
                            name="payment"
                            value="Card"
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />
                        <i className="bi bi-credit-card me-2"></i>
                        Debit / Credit Card
                    </label>

                </div>

                <button
                    className="btn  btn-lg mt-4 rounded-pill shadow badge-color"
                    onClick={handlePayment}
                >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Confirm Payment
                </button>
            </div>

        </div>
    );
}

export default Payment;