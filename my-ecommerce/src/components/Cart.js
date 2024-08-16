import React, { useState } from "react";
import "./styles1.css";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart }) => {
  const [quantities, setQuantities] = useState(cart.map(() => 1)); // Start with a quantity of 1 for all items
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Function to handle quantity increase
  const increaseQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] += 1;
      return updatedQuantities;
    });
  };

  // Function to handle quantity decrease
  const decreaseQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[index] > 1) {
        updatedQuantities[index] -= 1;
      }
      return updatedQuantities;
    });
  };

  const handleRemove = (index) => {
    removeFromCart(index);
    setQuantities((prevQuantities) =>
      prevQuantities.filter((_, i) => i !== index)
    );
  };

  // Calculate total price considering the quantity
  const totalPrice = cart.reduce(
    (acc, item, index) => acc + item.price * quantities[index],
    0
  );
  const totalPayable = totalPrice - discount;

  const coupons = [
    { code: "independence60", discount: 60, maxAmount: 200 },
    { code: "independence75", discount: 75, maxAmount: 700 },
    { code: "independence78", discount: 780, maxAmount: 10000 },
  ];

  const validCoupons = coupons.filter(
    (coupon) => totalPrice >= coupon.maxAmount
  );

  const handleApplyCoupon = () => {
    const selectedCoupon = coupons.find((c) => c.code === coupon);

    if (selectedCoupon && totalPrice >= selectedCoupon.maxAmount) {
      setDiscount(selectedCoupon.discount);
    } else {
      setDiscount(0);
      alert("Invalid coupon code or conditions not met.");
    }
  };

  const handleCheckout = () => {
    setMessage("You have successfully placed your order!");

    setTimeout(() => {
      setMessage("");
      setQuantities([]);
      setCoupon("");
      setDiscount(0);
      removeFromCart(null);
      navigate("/thanks");
    }, 2000);
  };

  return (
    <>
      {message && <div className="cart-message">{message}</div>}
      <div className="cart-page">
        {/* Conditionally show empty cart message */}
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <h2>Your cart is empty</h2>
            <Link to="/" className="btn btn-primary">
              Go Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items Section */}
            <div className="cart-section">
              <div className="cart-container">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="data">
                      <h5>{item.name}</h5>
                      <p>{item.description}</p>
                      <h4>{item.price * quantities[index]} Rs</h4>
                      <div className="flex">
                        <button
                          className="btn"
                          onClick={() => decreaseQuantity(index)}
                        >
                          -
                        </button>
                        <span className="num">{quantities[index]}</span>
                        <button
                          className="btn"
                          onClick={() => increaseQuantity(index)}
                        >
                          +
                        </button>

                        <button
                          className="remove"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="checkout-section">
              <h3>Summary</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Amount: {totalPrice} Rs</p>
              <p>Discount: {discount} Rs</p>
              <p>Amount Payable: {totalPayable} Rs</p>

              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Apply Coupon</button>

              <h4>Available Coupons</h4>
              <ul className="coupon-list">
                {validCoupons.map((c) => (
                  <li key={c.code} className="tricolor-coupon">
                    <div className="coupon-section orange">{c.code}</div>
                    <div className="coupon-section white">
                      {c.discount} Rs off
                    </div>
                    <div className="coupon-section green">
                      for orders of {c.maxAmount} Rs and above
                    </div>
                  </li>
                ))}
              </ul>

              <button onClick={handleCheckout}>CheckOut Now</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
