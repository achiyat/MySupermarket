// client/src/components/RouterComponent/routerComponent.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { User } from "../../Interfaces/interfaces";
import { SignUp } from "../SignUp/signUp";

export const RouterComponent: React.FC<{ user: User }> = ({ user }) => {
  const { role } = user;
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to the {role} dashboard</h1>} />
      <Route path="/home" element={<h1>Welcome to the {role} dashboard</h1>} />
      <Route path="/profile" element={<div>Profile Page</div>} />
      <Route path="/management" element={<div>Management Page</div>} />
      <Route path="/permissions" element={<SignUp />} />
      <Route path="/work" element={<div>Work Page</div>} />
      <Route path="/store" element={<div>Store Page</div>} />
    </Routes>
  );
};
