import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  
  useEffect(() => {
    const verifyToken = async () => {
      console.log("🔍 Verifying token...");
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        console.log("❌ No token found, redirecting...");
        setIsValid(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify-token", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        console.log("✅ Token verification response:", res.data);

        // Fix: Check if `user` exists in response instead of using `res.data.valid`
        setIsValid(res.data.user ? true : false);
      } catch (error) {
        console.error("❌ Token verification failed:", error);
        setIsValid(false);
        localStorage.removeItem("authToken");
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) return <p>Loading...</p>;

  return isValid ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
