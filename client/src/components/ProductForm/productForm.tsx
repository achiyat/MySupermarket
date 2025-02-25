// client/src/components/ProductForm/productForm.tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { Category, Product, User } from "../../Interfaces/interfaces";
import { productConfig } from "../../dictionaries/saleFields";
import { Dropdown } from "../Dropdown/dropdown";
import { DropBox } from "../DropBox/dropbox";
import "./productForm.css";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (product: Product) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const { user } = useOutletContext<{ user: User }>();
  const defaultFormData = {
    store: "",
    name: "",
    description: "",
    price: "",
    categories: [] as Category[],
    images: [] as string[],
    numberInStock: "",
    sale: {
      price: "",
      fromDate: "",
      toDate: "",
    },
  };

  const formatSale = (sale?: Product["sale"]) => {
    if (!sale) return defaultFormData.sale;

    return {
      price: String(sale.price),
      fromDate: format(new Date(sale.fromDate), "dd/MM/yyyy"),
      toDate: format(new Date(sale.toDate), "dd/MM/yyyy"),
    };
  };

  const [formData, setFormData] = useState({
    ...defaultFormData,
    ...initialData,
    sale: formatSale(initialData?.sale),
  });

  const [showSale, setShowSale] = useState(!!initialData?.sale);
  const [saleError, setSaleError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      sale: { ...prev.sale, [e.target.name]: e.target.value },
    }));
  };

  const handleCategoryChange = (selectedCategories: Category[]) => {
    setFormData((prev) => ({ ...prev, categories: selectedCategories }));
  };

  const handleImageChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
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
      : undefined;

    const productData: Product = {
      ...formData,
      price: Number(formData.price),
      numberInStock: Number(formData.numberInStock),
      sale: saleData,
    };

    onSubmit(productData);
  };

  return (
    <div className="productForm-container">
      <h2>{initialData ? "Edit" : "Create"} Product</h2>
      <form onSubmit={handleSubmit} className="productForm-form">
        {!initialData && user?.employeeFields?.stores && (
          <select name="store" onChange={handleChange} required>
            <option value="">Select Store</option>
            {user.employeeFields.stores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.address}
              </option>
            ))}
          </select>
        )}

        {productConfig.map((field) =>
          field.section === "sale" && !showSale ? null : field.type ===
            "textarea" ? (
            <textarea
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={String(
                formData[field.name as keyof typeof formData] ?? ""
              )}
              onChange={handleChange}
              required={field.required}
            />
          ) : (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={
                field.section === "sale"
                  ? String(
                      formData.sale[field.name as keyof Product["sale"]] ?? ""
                    )
                  : String(formData[field.name as keyof Product] ?? "")
              }
              onChange={
                field.section === "sale" ? handleSaleChange : handleChange
              }
              required={field.required}
              step={field.step}
              min={field.min}
            />
          )
        )}

        <label className="productForm-saleToggle">
          <input
            type="checkbox"
            checked={showSale}
            onChange={() => setShowSale(!showSale)}
          />{" "}
          Add Sale
        </label>
        {showSale && saleError && (
          <p className="productForm-error">{saleError}</p>
        )}

        <Dropdown
          onChange={handleCategoryChange}
          _categories={initialData ? formData.categories : undefined}
        />

        <DropBox
          images={formData.images ?? []}
          onImageChange={handleImageChange}
        />

        <button type="submit" className="productForm-submit">
          {initialData ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </div>
  );
};
