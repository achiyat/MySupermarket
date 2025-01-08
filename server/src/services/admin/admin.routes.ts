// server/src/services/admin/admin.routes.ts
import { Router } from "express";
import {
  createCategory,
  createProduct,
  createStore,
  createUser,
  deleteUser,
  getAllCategories,
  getAllProducts,
  getAllStores,
  getAllUser,
  getCategoryById,
  getProductById,
  getStoreById,
  getUserById,
  getUserWithStores,
  updateCategory,
  updateProduct,
  updateStore,
  updateUser,
} from "./admin.controller";
import {
  validateCategory,
  validateStore,
  validateUser,
} from "./admin.middlewares";

export const adminRoutes: Router = Router();

adminRoutes.post("/models", validateUser, createUser);
adminRoutes.get("/models/:id", getUserById);
// adminRoutes.get("/models", getAllUsers);

// User CRUD operations
adminRoutes.post("/users", createUser, validateUser);
adminRoutes.get("/users/:id", getUserById);
adminRoutes.get("/users", getAllUser);
adminRoutes.put("/users/:id", updateUser);
adminRoutes.delete("/users/:id", deleteUser);
adminRoutes.get("/users/stores/:id", getUserWithStores);

// Store CRU operations
adminRoutes.post("/stores", createStore, validateStore);
adminRoutes.get("/stores", getAllStores);
adminRoutes.get("/stores/:id", getStoreById);
adminRoutes.put("/stores/:id", updateStore);

// Category CRU operations
adminRoutes.post("/categories", validateCategory, createCategory);
adminRoutes.get("/categories", getAllCategories);
adminRoutes.get("/categories/:id", getCategoryById);
adminRoutes.put("/categories/:id", updateCategory);

// Product CRU operations
adminRoutes.post("/products", createProduct);
adminRoutes.get("/products", getAllProducts);
adminRoutes.get("/products/:id", getProductById);
adminRoutes.put("/products/:id", updateProduct);

// validateProduct
