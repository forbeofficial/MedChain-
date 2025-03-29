import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

function SignInForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      const token = res.data.token;
      if (!token) throw new Error("No token received");
  
      localStorage.setItem("authToken", token);
      setMessage("Login successful!");
  
      // Navigate only after setting token
      navigate("/dashboard");
      console.log("Stored Token:", localStorage.getItem("authToken"));

    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };
  

  return (
    <div className="login-card">
      <div className="brand">
        <h1>Login</h1>
        <p>Enter your phone number and password</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            autoComplete="tel"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="signup-link">
        <p>
          Don't have an account? <a href="/signup" onClick={onSwitch}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
