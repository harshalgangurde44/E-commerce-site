import React from "react";
import { useUser } from "./UserProvider";
import axios from "axios";

const ProductCard = ({ product, addToCart, user, onDelete }) => {
  // console.log(user);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/products/${product._id}`);
      onDelete(product._id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const { isAdmin } = user;
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <p>{product.price} Rs</p>
      {isAdmin ? (
        <>
          <button className="button-color" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <button className="button-color" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
