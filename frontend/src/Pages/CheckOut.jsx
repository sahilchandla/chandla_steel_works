import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const location = useLocation();                 //ek page se dusre page par bheja gaya data receive karne ke liye use hota hai

    const cart = useSelector((state) => state.cart);

    const orderProduct = location.state?.product;

    const checkoutProducts = orderProduct
        ? [
            {
                id: orderProduct._id,
                name: orderProduct.pname,
                price: orderProduct.price,
                image: orderProduct.image,
                quantity: 1,
                totalPrice: orderProduct.price,
            },
        ]
        : cart.items;

    const totalItems = orderProduct ? 1 : cart.totalQuantity;

    const totalAmount = orderProduct ? orderProduct.price : cart.totalAmount;

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (user) {
            setCustomer((prev) => ({
                ...prev,
                name: user.name,
            }));
        }
    }, []);

    const handlePlaceOrder = () => {

        if (checkoutProducts.length === 0) {
            toast.warning("Your cart is empty!");
            return;
        }

        if (!customer.phone || !customer.address) {
            toast.warning("Please enter phone number and address");
            return;
        }

        navigate("/payment", {
            state: {
                checkoutProducts,
                customer,
                totalAmount,
                totalItems,
            },
        });
    };

    return (
        <div className="container mt-5">

            <h2>Checkout</h2>

            <hr />

            {/* CUSTOMER DETAILS */}

            <div className="card p-4 mb-4">

                <h3>Customer Information</h3>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Name"
                    value={customer.name}
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Phone Number"
                    value={customer.phone}
                    onChange={(e) =>
                        setCustomer({
                            ...customer,
                            phone: e.target.value,
                        })
                    }
                />

                <textarea
                    className="form-control"
                    placeholder="Enter Address"
                    rows="3"
                    value={customer.address}
                    onChange={(e) =>
                        setCustomer({
                            ...customer,
                            address: e.target.value,
                        })
                    }
                />

            </div>

            {/* PRODUCTS */}

            <div className="card p-4 mb-4">

                <h3>Ordered Products</h3>

                {
                    checkoutProducts.length > 0 ? (

                        checkoutProducts.map((item) => (

                            <div
                                key={item.id}
                                className="d-flex align-items-center border-bottom py-3"
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width="100"
                                    height="100"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />

                                <div className="ms-3">

                                    <h5>{item.name}</h5>

                                    <p>Price: ₹{item.price}</p>

                                    <p>Quantity: {item.quantity}</p>

                                    <p>Total: ₹{item.totalPrice}</p>

                                </div>

                            </div>

                        ))

                    ) : (

                        <p>No Products Found</p>

                    )
                }

            </div>

            {/* ORDER SUMMARY */}

            <div className="card p-4">

                <h3>Order Summary</h3>

                <hr />

                <p>
                    <strong>Total Items:</strong> {totalItems}
                </p>

                <p>
                    <strong>Subtotal:</strong> ₹{totalAmount}
                </p>

                <p>
                    <strong>Delivery:</strong> Free
                </p>

                <h4>
                    <strong>Grand Total:</strong> ₹{totalAmount}
                </h4>

                <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>

            </div>

        </div>
    );
}

export default Checkout;