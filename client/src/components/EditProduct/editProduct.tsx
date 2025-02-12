// client/src/components/EditProduct/editProduct.tsx
import React, { useState } from "react";
import { Category, Product } from "../../Interfaces/interfaces";
import "./editProduct.css";
import { Dropdown } from "../Dropdown/dropdown";
import { DropBox } from "../DropBox/dropbox";
import { format } from "date-fns";

interface EditProductProps {
  product: Product;
  onEdit: (updatedProduct: Product) => void;
}

export const EditProduct: React.FC<EditProductProps> = ({
  product,
  onEdit,
}) => {
  const [formData, setFormData] = useState<Product>(product);
  const [showSale, setShowSale] = useState(false);
  const [sale, setSale] = useState({
    price: `${product.sale?.price ?? ""}`,
    fromDate: product.sale?.fromDate
      ? format(new Date(product.sale.fromDate), "dd/MM/yyyy")
      : "",
    toDate: product.sale?.toDate
      ? format(new Date(product.sale.toDate), "dd/MM/yyyy")
      : "",
  });

  const [saleError, setSaleError] = useState<string | null>(null);

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

  const handleSaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
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

    const fromDate = parseDate(sale.fromDate);
    const toDate = parseDate(sale.toDate);

    if (showSale) {
      if (!validateDate(sale.fromDate) || !validateDate(sale.toDate)) {
        setSaleError(
          "Sale dates must be in the format DD/MM/YYYY (e.g., 31/01/2000)."
        );
        return;
      }

      if (fromDate >= toDate) {
        setSaleError("The 'from' date must be before the 'to' date.");
        return;
      }
    }

    const saleData = showSale
      ? {
          price: parseFloat(sale.price),
          fromDate: fromDate,
          toDate: toDate,
        }
      : null;

    const productData: Product = {
      ...formData,
      sale: saleData ? saleData : formData.sale,
    };

    console.log(productData);

    onEdit(productData);
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

        <label className="sale-checkbox">
          <input type="checkbox" onChange={() => setShowSale(!showSale)} /> Add
          Sale
        </label>
        {showSale && (
          <div className="sale-section">
            <input
              type="number"
              name="price"
              placeholder="Sale Price"
              value={sale.price}
              onChange={handleSaleChange}
              step="0.01"
              min="0"
              required
            />
            <input
              type="text"
              name="fromDate"
              placeholder="Start Date (DD/MM/YYYY)"
              value={sale.fromDate}
              onChange={handleSaleChange}
              required
            />
            <input
              type="text"
              name="toDate"
              placeholder="End Date (DD/MM/YYYY)"
              value={sale.toDate}
              onChange={handleSaleChange}
              required
            />
            {saleError && <p className="error">{saleError}</p>}
          </div>
        )}

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
