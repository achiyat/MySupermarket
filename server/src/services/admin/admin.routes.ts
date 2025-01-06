// server/src/services/admin/admin.routes.ts
import { Router } from "express";
import {
  createStore,
  createUser,
  deleteUser,
  getAllStores,
  getAllUser,
  getStoreById,
  getUserById,
  updateStore,
  updateUser,
} from "./admin.controller";
import { validateStore, validateUser } from "./admin.middlewares";

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

// // Category CRU operations
// adminRoutes.post("/categories", create.category);
// adminRoutes.get("/categories", getAll.category);
// adminRoutes.get("/categories/:id", getById.category);
// adminRoutes.put("/categories/:id", update.category);
