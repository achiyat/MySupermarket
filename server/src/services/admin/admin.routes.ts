// server/src/services/admin/admin.routes.ts
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "./admin.controller";
import { validateUser } from "./admin.middlewares";

export const adminRoutes: Router = Router();

// User CRUD operations
adminRoutes.post("/users", createUser, validateUser);
adminRoutes.get("/users/:id", getUserById);
adminRoutes.get("/users", getAllUser);
adminRoutes.put("/users/:id", updateUser);
adminRoutes.delete("/users/:id", deleteUser);

// // Store CRU operations
// adminRoutes.post("/stores", create.store);
// adminRoutes.get("/stores", getAll.store);
// adminRoutes.get("/stores/:id", getById.store);
// adminRoutes.put("/stores/:id", update.store);

// // Category CRU operations
// adminRoutes.post("/categories", create.category);
// adminRoutes.get("/categories", getAll.category);
// adminRoutes.get("/categories/:id", getById.category);
// adminRoutes.put("/categories/:id", update.category);
