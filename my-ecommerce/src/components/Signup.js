// Signup.js
import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    signupName: "",
    signupEmail: "",
    signupPassword: "",
  });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // console.log(signupData);
    try {
      const response = await axios.post("http://localhost:3002/api/reg", {
        signupData,
      });
      console.log(response.data.User);
      if (response.status === 200) {
        console.log("Signup successful");
        navigate("/login");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="signupName"
            value={signupData.signupName}
            onChange={(e) =>
              setSignupData({ ...signupData, signupName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="signupEmail"
            value={signupData.signupEmail}
            onChange={(e) =>
              setSignupData({ ...signupData, signupEmail: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="signupPassword"
            value={signupData.signupPassword}
            onChange={(e) =>
              setSignupData({ ...signupData, signupPassword: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <button onClick={handleSignupSubmit} type="summit">
            Signup
          </button>
        </div>
        <div>
          Already have account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
