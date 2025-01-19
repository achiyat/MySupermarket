// client/src/components/StoreForm/storeForm.tsx
import React, { useState } from "react";
import "./storeForm.css";

export const StoreForm: React.FC = () => {
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
    console.log(formData);
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
