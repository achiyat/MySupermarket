// client/src/components/EditProduct/editProduct.tsx
import React, { useState } from "react";
import { Category, Product } from "../../Interfaces/interfaces";
import { updateProduct } from "../../services/api";
import "./editProduct.css";
import { Dropdown } from "../Dropdown/dropdown";
import { DropBox } from "../DropBox/dropbox";

interface EditProductProps {
  product: Product;
  onEdit: (updatedProduct: Product) => void;
}

export const EditProduct: React.FC<EditProductProps> = ({
  product,
  onEdit,
}) => {
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategories: Category[]) => {
    const _categories = selectedCategories.map((cat) => ({
      _id: cat._id,
      name: "",
    }));
    setFormData({ ...formData, categories: _categories });
  };

  const handleImageChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(product._id!, formData);
      onEdit(formData);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="editProduct-form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="editProduct-form">
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
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
        <input
          type="number"
          name="numberInStock"
          id="numberInStock"
          value={formData.numberInStock}
          onChange={handleChange}
          min="0"
        />

        <Dropdown
          _categories={formData.categories}
          onChange={handleCategoryChange}
        />

        <DropBox
          images={formData.images ?? []}
          onImageChange={handleImageChange}
        />

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
