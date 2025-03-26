import React from "react";
import "./App.css"

function SignInForm({ onSwitch }) {
  return (
    <div className="login-card">
      <div className="brand">
        <div className="brand-logo"></div>
        <h1>Welcome back</h1>
        <p>Enter your credentials to access your account</p>
      </div>

      <form id="loginForm">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" autoComplete="name" />
          <div className="error" id="nameError"></div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" autoComplete="username" />
          <div className="error" id="usernameError"></div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" autoComplete="tel" />
          <div className="error" id="phoneError"></div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="name@company.com" autoComplete="email" />
          <div className="error" id="emailError"></div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" autoComplete="current-password" />
          <div className="error" id="passwordError"></div>
        </div>

        <button type="submit" className="login-btn" id="loginButton">
          Sign in
        </button>
      </form>

      <div className="signup-link">
        <p>
          Don’t have an account? <a href="#" onClick={onSwitch}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
