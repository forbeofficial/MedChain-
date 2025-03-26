import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function SignInForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    userType: "patient", 
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      localStorage.setItem("token", res.data.token); 
      setMessage("Signup successful!");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-card">
      <div className="brand">
        <div className="brand-logo"></div>
        <h1>Welcome</h1>
        <p>Create your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" autoComplete="name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" autoComplete="username" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" autoComplete="tel" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="name@company.com" autoComplete="email" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" autoComplete="current-password" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="userType">User Type</label>
          <select id="userType" value={formData.userType} onChange={handleChange}>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>

      <div className="signup-link">
        <p>
          Already have an account? <a href="#" onClick={onSwitch}>Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
