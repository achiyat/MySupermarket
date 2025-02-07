import React, { useState, useRef, useEffect } from "react";
import "./createProduct.css";
import { Category, Product, User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/dropdown";
import { getAllCategories, createProduct } from "../../services/api";

export const CreateProduct = () => {
  const { user } = useOutletContext<{ user: User }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    store: "",
    name: "",
    description: "",
    price: 0,
    categories: [] as Category[],
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        const mappedCategories = fetchedCategories.map((cat: any) => ({
          id: cat._id,
          name: cat.name,
        }));
        setCategories(mappedCategories);
      } catch (error) {
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (selectedCategories: Category[]) => {
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...newFiles];
    setFormData({ ...formData, images: updatedImages });

    addImagePreviews(newFiles);
    updateFileInput(updatedImages);
  };

  const addImagePreviews = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const filteredImages = formData.images.filter((_, i) => i !== index);
    const filteredPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({ ...formData, images: filteredImages });
    setImagePreviews(filteredPreviews);
    updateFileInput(filteredImages);
  };

  const updateFileInput = (files: File[]) => {
    if (!fileInputRef.current) return;

    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      ...formData,
      images: formData.images.map((file) => file.name),
    };

    try {
      const newProduct = await createProduct(productData);
      console.log(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <select name="store" onChange={handleChange} required>
          <option value="">Select Store</option>
          {user.employeeFields?.stores?.map((store) => (
            <option key={store._id} value={store._id}>
              {store.address}
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
          step="0.01"
          min="0"
          required
        />

        {categories.length > 0 ? (
          <Dropdown categories={categories} onChange={handleCategoryChange} />
        ) : (
          <p className="error">{error}</p>
        )}

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
