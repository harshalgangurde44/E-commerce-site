import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart, user, onDelete }) => {
  const [message, setMessage] = useState("");

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} has been added to your cart!`);
    setTimeout(() => {
      setMessage("");
    }, 2000); // Message disappears after 2 seconds
  };

  return (
    <>
      {message && <div className="cart-message">{message}</div>}
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={handleAddToCart} // Pass down the new handler
            user={user}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
