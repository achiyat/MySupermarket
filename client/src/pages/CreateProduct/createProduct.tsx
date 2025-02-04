import React, { useState, useRef } from "react";
import "./createProduct.css";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";

export const CreateProduct = () => {
  const { user } = useOutletContext<{ user: User }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    store: "",
    name: "",
    description: "",
    price: "",
    categories: "",
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    const updatedImages = [...formData.images, ...newFiles];
    setFormData({
      ...formData,
      images: updatedImages,
    });

    addImagePreviews(newFiles);
    updateFileInput(updatedImages);
  };

  const addImagePreviews = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    if (!fileInputRef.current?.files) return;

    const files = Array.from(fileInputRef.current.files);
    const filteredFiles = files.filter((_, i) => i !== index);
    const filteredImages = formData.images.filter((_, i) => i !== index);
    const filteredPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({ ...formData, images: filteredImages });
    setImagePreviews(filteredPreviews);
    updateFileInput(filteredFiles);
  };

  const updateFileInput = (files: File[]) => {
    if (!fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
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
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          multiple
          ref={fileInputRef}
        />

        {/* Image Preview Section */}
        <div className="image-preview-container">
          {imagePreviews.map((src, index) => (
            <div key={index} className="image-preview">
              <img src={src} alt="Preview" />
              <button
                type="button"
                className="remove"
                onClick={() => handleRemoveImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button className="create" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};
