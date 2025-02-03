// client/src/pages/CreateProduct/createProduct.tsx
import React, { useState } from "react";
import "./createProduct.css";

export const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categories: "",
    images: "",
  });

  const dummyStoreId = "123456";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      store: dummyStoreId,
      categories: formData.categories.split(",").map((cat) => cat.trim()),
      images: formData.images.split(",").map((img) => img.trim()),
    };
    console.log("Product Data Submitted:", productData);
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma-separated)"
          value={formData.categories}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="images"
          placeholder="Image URLs (comma-separated)"
          value={formData.images}
          onChange={handleChange}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};
