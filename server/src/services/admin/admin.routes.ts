// server/src/services/admin/admin.routes.ts
import { Router } from "express";
// import { validateUser } from "./admin.middlewares";
import { Models } from "../../utils";
import {
  createEntity,
  deleteUser,
  getAllEntity,
  getEntityById,
  updateEntity,
} from "./admin.controller";

export const adminRoutes: Router = Router();

// User CRUD operations
adminRoutes.post("/users", createEntity(Models.User));
adminRoutes.get("/users/:id", getEntityById(Models.User));
adminRoutes.get("/users", getAllEntity(Models.User));
adminRoutes.put("/users/:id", updateEntity(Models.User));
adminRoutes.delete("/users/:id", deleteUser);
// adminRoutes.get("/users/stores/:id", getEntityById(Models.User)); // WithStores

// Store CRU operations
adminRoutes.post("/stores", createEntity(Models.Store)); // validate validateStore
adminRoutes.get("/stores/:id", getEntityById(Models.Store));
adminRoutes.get("/stores", getAllEntity(Models.Store));
adminRoutes.put("/stores/:id", updateEntity(Models.Store));

// Category CRU operations
adminRoutes.post("/categories", createEntity(Models.Category)); // validate validateCategory
adminRoutes.get("/categories/:id", getEntityById(Models.Category));
adminRoutes.get("/categories", getAllEntity(Models.Category));
adminRoutes.put("/categories/:id", updateEntity(Models.Category));

// Product CRU operations
adminRoutes.post("/products", createEntity(Models.Product));
adminRoutes.get("/products", getAllEntity(Models.Product));
adminRoutes.get("/products/:id", getEntityById(Models.Product));
adminRoutes.put("/products/:id", updateEntity(Models.Product));
