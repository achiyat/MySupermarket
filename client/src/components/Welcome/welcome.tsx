// src/components/Welcome/welcome.tsx
import React from "react";
import "./welcome.css";
import { Logout } from "../Logout/logout";
import { useAuth0 } from "@auth0/auth0-react";

export const Welcome: React.FC = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <div className="welcome-container">
      <h1>Welcome to the supermarket website</h1>
      <Logout />
    </div>
  );
};
