import React from "react";
import "./styles1.css";
import { Link } from "react-router-dom";
const Thank = () => {
  return (
    <>
      <div className="thank">Thank You for Shopping!</div>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </>
  );
};

export default Thank;
