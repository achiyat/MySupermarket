// client/src/pages/MyProducts/myProducts.tsx
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { getAllProducts } from "../../services/api";
import { Product } from "../../Interfaces/interfaces";
import { ModalProductForm } from "../../components/Modals/ModalProductForm/modalProductForm";
import "./myProducts.css";

export const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      let matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      let matchesActiveStatus =
        isActiveFilter === null || product.active === isActiveFilter;
      return matchesSearch && matchesActiveStatus;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, isActiveFilter, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleActiveFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsActiveFilter(
      e.target.value === "all" ? null : e.target.value === "active"
    );
  };

  const handleCreate = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>My Products</h2>
        <button className="create-button" onClick={handleCreate}>
          Create Product
        </button>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleActiveFilterChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            {product.sale && <div className="sale-badge">SALE</div>}

            <div
              className={`product-image ${product.active ? "" : "inactive"}`}
            >
              <img src={product.images?.[0]} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="price-container">
                {product.sale && product.sale.price ? (
                  <>
                    <span className="price original">${product.price}</span>
                    <span className="price sale">
                      Only ${product.sale.price}
                    </span>
                  </>
                ) : (
                  <span className="price">${product.price}</span>
                )}
              </div>

              {product.sale && product.sale.toDate && (
                <p className="sale-period">
                  The sale lasts until {formatDate(product.sale.toDate)}
                </p>
              )}

              <div className="stock-container">
                <p className="stock-info">
                  In Stock: {product.numberInStock ?? 0} items
                </p>
                {product.numberInStock !== undefined &&
                  product.numberInStock < 10 && (
                    <p className="warning">
                      {product.numberInStock === 0
                        ? "Out of stock!"
                        : `Hurry! Only ${product.numberInStock} left in stock`}
                    </p>
                  )}
              </div>

              <div className="category-tags">
                {product.categories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category.name}
                  </span>
                ))}
              </div>
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalProductForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
      />
      ;
    </div>
  );
};
