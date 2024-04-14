import React from "react";
import "./styles.css";

const Cart = ({ cart, removeFromCart }) => {
  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    alert("You have successfully place your order");
  };

  return (
    <>
      <div className="total">
        <h3>Total: {totalPrice} Rs</h3>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
      <h2>Cart</h2>
      <div className="cart-container">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div>
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <h4>{item.price} Rs</h4>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
