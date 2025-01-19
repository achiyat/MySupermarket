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
import { DetailView } from "./pages/DetailView/detailView";
import { Category, Store, User } from "./Interfaces/interfaces";
import { links } from "./dictionaries/links";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path={`/`} element={<Home />} />
        <Route path={`/${links.home}`} element={<Home />} />
        <Route path={`/${links.profile}`} element={<div>Profile Page</div>} />
        <Route path={`/${links.work}`} element={<div>Work Page</div>} />
        <Route path={`/${links.shopping}`} element={<div>Shopping Page</div>} />
        <Route path={`/${links.users}`} element={<Users />} />
        <Route
          path={`/${links.users}/:id`}
          element={<DetailView<User> pageType="users" />}
        />
        <Route path={`/${links.stores}`} element={<Stores />} />
        <Route
          path={`/${links.stores}/:id`}
          element={<DetailView<Store> pageType="stores" />}
        />
        <Route path={`/${links.categories}`} element={<Categories />} />
        <Route
          path={`/${links.categories}/:id`}
          element={<DetailView<Category> pageType="categories" />}
        />
      </Route>

      {/* Public Routes */}
      <Route path={`/${links.login}`} element={<Login />} />
      <Route path={`/${links.signUp}`} element={<SignUp />} />

      {/* Fallback */}
      <Route path={links.fallback} element={<h1>404 Page</h1>} />
    </Routes>
  );
};

export default App;
