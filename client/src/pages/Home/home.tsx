import React from "react";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";

export const Home: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const { user } = useOutletContext<{ user: User }>();

  if (!token) {
    console.log("not token");
  }

  return (
    <div>
      <h1>Welcome to the {user.role} dashboard</h1>
    </div>
  );
};
