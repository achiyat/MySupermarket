// client/src/components/StoreForm/storeForm.tsx
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User } from "../../Interfaces/interfaces";
import { createRequest } from "../../services/api";
import "./storeForm.css";

export const StoreForm: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      requestType: "Create a store",
      requestDate: new Date().toISOString(),
      status: "Pending",
      data: { ...formData, employeeId: user._id },
    };

    try {
      await createRequest(requestData);
    } catch (error) {
      console.error("Error creating store request:", error);
    }
  };

  return (
    <div className="storeForm-container">
      <h3>Create a Store</h3>
      <form onSubmit={handleSubmit}>
        <label className="storeForm-label">
          Store Name:
          <input
            className="storeForm-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="storeForm-label">
          Branch:
          <input
            className="storeForm-input"
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          />
        </label>
        <label className="storeForm-label">
          Address:
          <input
            className="storeForm-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <button className="storeForm-button" type="submit">
          Create Store
        </button>
      </form>
    </div>
  );
};
