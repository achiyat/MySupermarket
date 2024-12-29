// client/src/components/Navbar/navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { navbarUsers } from "../../dictionaries/navbarUsers";
import { Role } from "../../types/types";
import { Logout } from "../Logout/logout";

export const Navbar: React.FC<{ role: Role }> = ({ role }) => {
  const links = navbarUsers[role] || [];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img
          src="https://www.avenueanne.com/wp-content/uploads/2017/08/shopping-cart-728408_960_720.png"
          alt="Logo"
          className="navbar-logo"
        />
        <div>
          <Link to="/" className="navbar-brand">
            Supermarket
          </Link>
          {links.map((link) => (
            <Link key={link} to={`/${link}`} className="navbar-link">
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <div className="navbar-right">
        <Logout />
      </div>
    </header>
  );
};
