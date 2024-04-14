import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart, user, onDelete }) => {
  return (
    <>
      <div>Product List</div>
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
            user={user}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
