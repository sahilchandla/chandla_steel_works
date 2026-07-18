import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch all orders
    const fetchOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            // console.log("Token 👉", token);

            const res = await axios.get("http://localhost:5000/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("ORDERS 👉", res.data.orders);
            // console.log("First Order Products 👉", res.data.orders[0].products);

            setOrders(res.data.orders);
        } catch (error) {
            console.log("FULL ERROR 👉", error.response || error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // status update (optional)
    const updateStatus = async (id, status) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            await axios.put(
                `http://localhost:5000/api/orders/update/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchOrders();
        } catch (error) {
            console.log("Status update error:", error);
        }
    };

    return (
        <div className="container py-4">

            <h2 className="text-center admin-title mb-4">
                📦 Customer Orders
            </h2>

            {orders.length === 0 ? (
                <div className="alert alert-warning text-center">
                    No Orders Found
                </div>
            ) : (

                <div className="row">

                    {orders.map((order) => (

                        <div className="col-lg-6 mb-4" key={order._id}>

                            <div className="card shadow-lg border-0 rounded-4 h-100">

                                {/* Header */}

                                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                                    <h6 className="mb-0">
                                        Order ID : {order._id.slice(0, 10)}...
                                    </h6>

                                    <span
                                        className={`badge 
                                        ${order.orderStatus === "Pending"
                                                ? "bg-warning text-dark"
                                                : order.orderStatus === "Processing"
                                                    ? "bg-info"
                                                    : order.orderStatus === "Shipped"
                                                        ? "bg-primary"
                                                        : "bg-success"
                                            }`}
                                    >
                                        {order.orderStatus}
                                    </span>

                                </div>

                                {/* Body */}

                                <div className="card-body">

                                    <h5 className="fw-bold text-primary">
                                        👤 {order.customer?.name}
                                    </h5>

                                    <p className="mb-1">
                                        <b>Phone :</b> {order.customer?.phone}
                                    </p>

                                    <p>
                                        <b>Address :</b> {order.customer?.address}
                                    </p>

                                    <hr />

                                    <div className="row text-center">

                                        <div className="col-6">
                                            <h6>Total</h6>
                                            <p className="fw-bold text-success">
                                                ₹ {order.totalAmount}
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <h6>Payment</h6>
                                            <p className="fw-bold">
                                                {order.paymentMethod}
                                            </p>
                                        </div>

                                    </div>

                                    <hr />

                                    <h5 className="mb-3">
                                        Products
                                    </h5>

                                    {order.products.map((item, index) => (

                                        <div
                                            key={index}
                                            className="card mb-3 border-0 bg-light"
                                        >

                                            <div className="row g-0 align-items-center">

                                                <div className="col-4 text-center">

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded p-2 order-product-img"
                                                    />

                                                </div>

                                                <div className="col-8">

                                                    <div className="card-body">

                                                        <h6 className="fw-bold">
                                                            {item.name}
                                                        </h6>

                                                        <p className="mb-1">
                                                            Qty : {item.quantity}
                                                        </p>

                                                        <p className="mb-0 text-success fw-bold">
                                                            ₹ {item.price}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* Footer */}

                                <div className="card-footer bg-white">

                                    <div className="d-grid gap-2">

                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Processing"
                                                )
                                            }
                                        >
                                            Processing
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Shipped"
                                                )
                                            }
                                        >
                                            Shipped
                                        </button>

                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Delivered"
                                                )
                                            }
                                        >
                                            Delivered
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminOrders;