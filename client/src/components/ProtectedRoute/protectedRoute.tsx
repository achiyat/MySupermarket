import React from "react";
import { Navigate } from "react-router-dom";
import { Dashboard } from "../Dashboard/dashboard";

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("authToken");

  // Directly parsing the token
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.log("Error parsing token:", error);
      return null;
    }
  };

  // Parse the token if available
  const userId = token ? parseJwt(token)?.id : null;

  // Render directly based on token existence and userId
  return userId ? <Dashboard userId={userId} /> : <Navigate to="/login" />;
};
