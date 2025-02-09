import React, { useState, useEffect } from "react";
import "./createProduct.css";
import { Category, Product, User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/dropdown";
import { getAllCategories } from "../../services/api";
import { DropBox } from "../../components/DropBox/dropbox";
import { productFields } from "../../dictionaries/saleFields";

interface CreateProductProps {
  onCreate: (createed: Product) => void;
}

export const CreateProduct: React.FC<CreateProductProps> = ({ onCreate }) => {
  const { user } = useOutletContext<{ user: User }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saleError, setSaleError] = useState<string | null>(null);
  const [showSale, setShowSale] = useState(false);

  const [formData, setFormData] = useState({
    store: "",
    name: "",
    description: "",
    price: 0,
    categories: [] as Category[],
    images: [] as string[],
    numberInStock: 0,
    sale: {
      price: "",
      fromDate: "",
      toDate: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        const mappedCategories = fetchedCategories.map((cat: any) => ({
          _id: cat._id,
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
    const _categories = selectedCategories.map((cat) => ({
      _id: cat._id,
      name: "",
    }));
    setFormData({ ...formData, categories: _categories });
  };

  const handleImageChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      sale: { ...formData.sale, [e.target.name]: e.target.value },
    });
  };

  const validateDate = (dateStr: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(dateStr);
  };

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaleError(null);

    if (showSale) {
      if (
        !validateDate(formData.sale.fromDate) ||
        !validateDate(formData.sale.toDate)
      ) {
        setSaleError(
          "Sale dates must be in the format DD/MM/YYYY (e.g., 31/01/2000)."
        );
        return;
      }

      const fromDate = parseDate(formData.sale.fromDate);
      const toDate = parseDate(formData.sale.toDate);

      if (fromDate >= toDate) {
        setSaleError("The 'from' date must be before the 'to' date.");
        return;
      }
    }

    const saleData = showSale
      ? {
          price: parseFloat(formData.sale.price),
          fromDate: parseDate(formData.sale.fromDate),
          toDate: parseDate(formData.sale.toDate),
        }
      : null;

    const productData: Product = {
      store: formData.store,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categories: formData.categories,
      images: formData.images,
      numberInStock: formData.numberInStock || 0,
      ...(saleData && { sale: saleData }),
    };

    console.log(productData);
    onCreate(productData);
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

        {productFields.map(({ section, type, name, placeholder, ...attrs }) =>
          section === "sale" && !showSale ? null : type === "textarea" ? (
            <textarea
              key={name}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
            />
          ) : (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={section === "sale" ? handleSaleChange : handleChange}
              {...attrs}
            />
          )
        )}

        <label className="sale-checkbox">
          <input type="checkbox" onChange={() => setShowSale(!showSale)} /> Add
          Sale
        </label>
        {showSale && saleError && <p className="error">{saleError}</p>}

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
