import React, { useState } from "react";
import { useUser } from "./UserProvider";
import axios from "axios";

const ProductCard = ({ product, addToCart, user, onDelete }) => {
  const [message, setMessage] = useState("");

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} has been added to your cart!`);
    setTimeout(() => {
      setMessage("");
    }, 2000); // Message disappears after 2 seconds
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/products/${product._id}`);
      onDelete(product._id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <p>{product.price} Rs</p>
      {user ? (
        <>
          <button
            className="button-color"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <button
          className="button-color"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
