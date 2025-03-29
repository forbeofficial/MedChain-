import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./Createaccount";
import SignInForm from "./Login";
import Dashboard from "./MainPage/mainpage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
      </Routes>
  );
}

export default App;
