import React, { useState } from "react";
import "./App.css";

// Import both forms
import SignInForm from "./Createaccount";
import SignUpForm from "./Login";

function App() {
  // 'isSignUp' determines which form to show
  const [isSignUp, setIsSignUp] = useState(false);

  // Toggle function
  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="app-container">
      {isSignUp ? (
        <SignUpForm onSwitch={handleSwitch} />
      ) : (
        <SignInForm onSwitch={handleSwitch} />
      )}
    </div>
  );
}

export default App;
