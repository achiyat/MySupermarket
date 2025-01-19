// client/src/components/StoreForm/storeForm.tsx
import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Store Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Branch:
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Store</button>
    </form>
  );
};
