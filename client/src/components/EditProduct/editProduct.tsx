// client/src/components/EditProduct/editProduct.tsx
import React, { useState } from "react";
import { Product } from "../../Interfaces/interfaces";
import { updateProduct } from "../../services/api";
import "./editProduct.css";

interface EditProductProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

export const EditProduct: React.FC<EditProductProps> = ({
  product,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(product._id!, formData); // Update product with the full data
      onSave(formData); // Pass updated product back to parent
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="editProduct-form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="editProduct-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberInStock">Stock:</label>
          <input
            type="number"
            name="numberInStock"
            id="numberInStock"
            value={formData.numberInStock}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
