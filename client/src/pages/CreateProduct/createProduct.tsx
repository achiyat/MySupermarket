import React, { useState } from "react";
import "./createProduct.css";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";

export const CreateProduct = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [formData, setFormData] = useState({
    store: "",
    name: "",
    description: "",
    price: "",
    categories: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      store: formData.store,
      categories: formData.categories.split(",").map((cat) => cat.trim()),
      images: formData.images.map((file) => file.name),
    };
    console.log("Product Data Submitted:", productData);
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <select name="store" onChange={handleChange} required>
          <option value="">Select Store</option>
          {user.employeeFields?.stores?.map((store) => (
            <option key={store._id} value={store._id}>
              {store.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma-separated)"
          onChange={handleChange}
          required
        />
        <input type="file" name="images" onChange={handleFileChange} multiple />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};
