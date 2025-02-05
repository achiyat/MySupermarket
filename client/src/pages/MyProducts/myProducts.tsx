// client/src/pages/MyProducts/myProducts.tsx
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { getAllProducts } from "../../services/api";
import { Product } from "../../Interfaces/interfaces";
import "./myProducts.css";

export const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data);
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

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>My Products</h2>
        <button className="create-button">Create Product</button>
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
                <p className="sale-period">The sale lasts until {formatDate(product.sale.toDate)}</p>
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
                    {category}
                  </span>
                ))}
              </div>
              <button className="edit-button">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// const myProducts: Product[] = [
//   {
//     _id: "1",
//     store: "Store 1",
//     name: "Product 1",
//     description: "Description of Product 1",
//     categories: ["Electronics", "Mobile"],
//     price: 299.99,
//     sale: {
//       price: 249.99,
//       fromDate: new Date("2025-02-01"),
//       toDate: new Date("2025-02-28"),
//     },
//     images: ["https://cdn.store-assets.com/s/377840/i/32382133.jpg"],
//     lastUpdateDate: new Date(),
//     numberInStock: 10,
//     active: true,
//   },
//   {
//     _id: "2",
//     store: "Store 2",
//     name: "Product 2",
//     description: "Description of Product 2",
//     categories: ["Furniture"],
//     price: 499.99,
//     images: ["https://m.media-amazon.com/images/I/71VFLk-6LQL.jpg"],
//     lastUpdateDate: new Date(),
//     numberInStock: 5,
//     active: false,
//   },
//   {
//     _id: "3",
//     store: "Store 3",
//     name: "Product 3",
//     description: "Description of Product 3",
//     categories: ["Clothing"],
//     price: 49.99,
//     sale: {
//       price: 39.99,
//       fromDate: new Date("2025-02-01"),
//       toDate: new Date("2025-02-14"),
//     },
//     images: [
//       "https://images.heb.com/is/image/HEBGrocery/prd-medium/002116056.jpg",
//     ],
//     lastUpdateDate: new Date(),
//     numberInStock: 0,
//     active: true,
//   },
// ];
