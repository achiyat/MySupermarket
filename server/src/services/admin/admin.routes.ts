// server/src/services/admin/admin.routes.ts
import { Router } from "express";
import {
  createCategory,
  createStore,
  createUser,
  deleteUser,
  getAllCategories,
  getAllStores,
  getAllUser,
  getCategoryById,
  getStoreById,
  getUserById,
  updateCategory,
  updateStore,
  updateUser,
} from "./admin.controller";
import {
  validateCategory,
  validateStore,
  validateUser,
} from "./admin.middlewares";

export const adminRoutes: Router = Router();

// User CRUD operations
adminRoutes.post("/users", createUser, validateUser);
adminRoutes.get("/users/:id", getUserById);
adminRoutes.get("/users", getAllUser);
adminRoutes.put("/users/:id", updateUser);
adminRoutes.delete("/users/:id", deleteUser);

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
