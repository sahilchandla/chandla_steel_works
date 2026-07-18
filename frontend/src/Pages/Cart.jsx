import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity } from "../redux/CartSlice.js";               //Cart Slice ka action hai jo cart se product remove karta hai
import "./Cart.css";
function Cart() {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();                  //Redux ko action bhejne ke liye use hota hai

  console.log(cart);

  return (
    <div className="container mt-5">

      <div className="text-center mb-5">
        <h2 style={{ fontWeight: "bold" }}>My <span style={{ color: "orange" }}>Cart</span></h2>
        <span style={{ display: 'block', width: '50%', height: '2px', backgroundColor: 'orange', margin: '0 auto 20px' }}><hr />
        </span>
      </div>

      {
        cart.items.map((item) => (
          <div
            key={item.id}
            className="cart-card"
          >
            <div className="row align-items-center">

              <div className="col-md-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-image"
                />
              </div>

              <div className="col-md-9 cart-details">

                <h2 className="cart-title">
                  {item.name}
                </h2>

                <p className="cart-price">
                  ₹{item.price}
                </p>

                <p className="cart-qty">
                  Quantity : {item.quantity}
                </p>

                <div className="d-flex align-items-center gap-3 mb-3">

                  <button
                    className="btn btn-secondary"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>

                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold"
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-success"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove Item
                </button>

              </div>

            </div>
          </div>
        ))
      }


      <div className="cart-summary mt-4 mb-4 p-3 border rounded">

        <h3>Order Summary</h3>

        <hr />

        <p>
          <strong>Items:</strong> {cart.totalQuantity}
        </p>

        <p>
          <strong>Delivery:</strong> Free
        </p>

        <h4>
          <strong>Total:</strong> ₹{cart.totalAmount}
        </h4>

      </div>


    </div>
  );
}

export default Cart;