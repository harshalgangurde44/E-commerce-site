import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./UserProvider";
const AddProductModal = ({ showModal, setShowModal }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
  });
  const { setProducts } = useProducts();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  {
    // console.log(newProduct);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/api/products", newProduct)
      .then((response) => {
        console.log("Product added:", response.data);
        setProducts((prevProducts) => [...prevProducts, response.data]);
        // handleUpdate(response.data);
        setNewProduct({
          name: "",
          price: 0,
          imageUrl: "",
          description: "",
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Product Name:</label>
              <input
                className="add-product1"
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                className="add-product1"
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                className="add-product1"
                type="text"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                className="add-product1"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddProductModal;
