// src/components/Login/login.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./login.css";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <img
        src="https://www.avenueanne.com/wp-content/uploads/2017/08/shopping-cart-728408_960_720.png"
        alt="Shopping Cart"
        className="logo"
      />
      <button className="login-button" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};
