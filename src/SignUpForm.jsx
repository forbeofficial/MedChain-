import React from "react";
import "./App.css"

function SignUpForm({ onSwitch }) {
  return (
    <div className="login-card">
      <div className="brand">
        <div className="brand-logo"></div>
        <h1>Create an account</h1>
        <p>Enter your details to sign up</p>
      </div>

      <form id="signupForm">
  
        <div className="form-group">
          <label htmlFor="signupEmail">Phone</label>
          <input
            type="text"
            id="signupEmail"
            placeholder="Phone Number"
            autoComplete="Phone Number"
            name="phone"
          />
          <div className="error" id="PhoneError"></div>
        </div>
      

        <div className="form-group">
          <label htmlFor="signupPassword">Password</label>
          <input
            type="password"
            id="signupPassword"
            placeholder="Enter your password"
            autoComplete="new-password"
            name="password"
          />
          <div className="error" id="signupPasswordError"></div>
        </div>

        <button type="submit" className="login-btn" id="signupButton">
          Sign up
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

export default SignUpForm;
