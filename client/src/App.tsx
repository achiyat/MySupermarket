// client/src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/login";
import "./App.css";
import { Home } from "./pages/Home/home";
import { ProtectedRoute } from "./components/ProtectedRoute/protectedRoute";
import { SignUp } from "./components/SignUp/signUp";
import { Users } from "./pages/Users/users";
import { Stores } from "./pages/Stores/stores";
import { Categories } from "./pages/Categories/categories";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<h1>Welcome to the role dashboard</h1>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
        <Route path="/management" element={<div>Management Page</div>} />
        <Route path="/permissions" element={<div>Permissions Page</div>} />
        <Route path="/work" element={<div>Work Page</div>} />
        <Route path="/shopping" element={<div>Shopping Page</div>} />
        <Route path="/category" element={<Categories />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stores" element={<Stores />} />
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* Fallback */}
      <Route path="*" element={<h1>404 Page</h1>} />
    </Routes>
  );
};

export default App;
