// client/src/components/SignUp/signUp.tsx
import React, { useEffect, useState } from "react";
import { ObjectId } from "bson";
import { useAuth0 } from "@auth0/auth0-react";
import { User, UserFormData } from "../../Interfaces/interfaces";
import { Navbar } from "../Navbar/navbar";
import { RouterComponent } from "../RouterComponent/routerComponent";
import { Footer } from "../Footer/footer";
import { users } from "../../dictionaries/users";
import { DefaultFormData, Role } from "../../types/types";
import "./signUp.css";

export const SignUp: React.FC = () => {
  const { user } = useAuth0();
  const [roleUser, setRoleUser] = useState<Role>("Customer");
  const [newUser, setNewUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>(DefaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newUser: User = {
      _id: new ObjectId(),
      ...formData,
      role: roleUser !== "Administrator" ? formData.role : roleUser,
    };

    console.log({ newUser });

    setNewUser(newUser);

    // Here you can send `newUser` to your server or database
    // Example: axios.post('/api/users', newUser);
  };

  // Set roleUser based on currentUser role
  useEffect(() => {
    console.log(user);
    const currentUser = users.find((u) => u.id_auth0 === user?.sub);
    if (currentUser?.role === "Administrator") {
      setRoleUser("Employee");
    }
  }, [user]);

  // Log the roleUser state whenever it changes
  useEffect(() => {
    setFormData({
      name: roleUser === "Customer" ? user?.nickname || "" : "",
      email: roleUser === "Customer" ? user?.email || "" : "",
      id_auth0: roleUser === "Customer" ? user?.sub || "" : "",
      role: roleUser,
    });
  }, [roleUser]);

  // Render dashboard if user is created
  if (newUser && roleUser === "Customer") {
    return (
      <div className="dashboard-layout">
        <Navbar role={newUser.role} />
        <main className="dashboard-content">
          <RouterComponent user={newUser} />
        </main>
        <Footer />
      </div>
    );
  }

  // Otherwise, show the sign-up form
  return (
    <div className="form-container">
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <div className="form-item-container">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-item-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-item-container">
            <label htmlFor="id_auth0">Auth0 ID:</label>
            <input
              type="text"
              id="id_auth0"
              name="id_auth0"
              value={formData.id_auth0}
              onChange={handleChange}
              required
            />
          </div>

          {roleUser !== "Customer" && (
            <div className="form-item-container">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Administrator">Administrator</option>
                <option value="Employee">Employee</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
          )}

          <button
            className="submit-button"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
