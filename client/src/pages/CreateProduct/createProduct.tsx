import React, { useState, useEffect } from "react";
import "./createProduct.css";
import { Category, Product, User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/dropdown";
import { getAllCategories, createProduct } from "../../services/api";
import { DropBox } from "../../components/DropBox/dropbox";

export const CreateProduct = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    store: "",
    name: "",
    description: "",
    price: 0,
    categories: [] as string[],
    images: [] as string[],
  });

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

  // Modify this to store only category IDs
  const handleCategoryChange = (selectedCategories: Category[]) => {
    const categoryIds = selectedCategories
      .map((category) => category._id)
      .filter((id): id is string => id !== undefined); // Filter out undefined values

    setFormData({ ...formData, categories: categoryIds });
  };

  const handleImageChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categories = formData.categories.map((id) => ({
      _id: id,
      name: "", // You can fetch the name based on the ID if needed
    }));

    const productData: Product = {
      ...formData,
      categories,
    };

    console.log(productData);
    try {
      // const newProduct = await createProduct(productData);
      // console.log(newProduct);
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

        <DropBox images={formData.images} onImageChange={handleImageChange} />

        <button className="create" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};
