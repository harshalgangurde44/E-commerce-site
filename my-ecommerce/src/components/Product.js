import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import AddProductModal from "./AddProductModal";
import { useProducts } from "./UserProvider";
const Products = ({ addToCart, user }) => {
  // console.log(user);
  const [showModal, setShowModal] = useState(false);
  // const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const { products, setProducts } = useProducts([]);
  useEffect(() => {
    axios
      .get("http://localhost:3002/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [setProducts]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/search?query=${query}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleResetSearch = () => {
    setSearchResults([]);
    setQuery("");
  };
  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
    setSearchResults(
      searchResults.filter((product) => product._id !== productId)
    );
  };

  return (
    <>
      <div>
        <h4 className="add-new-product" onClick={() => setShowModal(true)}>
          Add New Product
        </h4>
      </div>
      <div className="search-bar">
        <input
          style={{ width: "550px", height: "30px" }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {searchResults.length > 0 && (
          <button onClick={handleResetSearch}>Reset Search</button>
        )}
      </div>
      <ProductList
        products={query.length > 0 ? searchResults : products}
        addToCart={addToCart}
        user={user}
        onDelete={handleDelete}
      />

      <AddProductModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Products;
