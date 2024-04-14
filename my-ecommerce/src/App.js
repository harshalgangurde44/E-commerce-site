// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Products from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./components/UserProvider";

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleLogin = (loginData) => {
    // console.log("Login Data:", loginData);
    setUser(loginData?.other);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    axios
      .post("http://localhost:3002/api/cart", product)
      .then((response) => {
        console.log("Product added to cart:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <header className="header">
            <div className="logo">
              <img
                height="100px"
                src="https://marketplace.canva.com/EAFzjXx_i5w/1/0/1600w/canva-blue-illustrative-e-commerce-online-shop-logo-fZejT2DpGCw.jpg"
                alt="Logo"
              />
            </div>
            <nav className="navbar">
              <ul>
                <li>
                  <Link className="color" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="color" to="/cart">
                    Cart ({cart.length})
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <button className="btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="color" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </header>

          <Routes>
            <Route
              path="/"
              element={<Products addToCart={addToCart} user={user} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
