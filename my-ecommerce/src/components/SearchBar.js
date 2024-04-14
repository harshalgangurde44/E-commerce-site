import React, { useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./styles.css";
const SearchBar = ({ addToCart }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/search?query=${query}`
      );
      setResults(response.data.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div className="search">
      <input
        style={{ width: "150px" }}
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {query &&
          results.map((result) => (
            <div key={result.id}>
              <ProductCard product={result} addToCart={addToCart} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
