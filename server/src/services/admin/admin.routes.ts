// server/src/services/admin/admin.routes.ts
import { Router } from "express";
import { Models } from "../../utils";
import {
  createEntity,
  deleteUser,
  getAllEntity,
  getCheckRequest,
  getEntityById,
  getRequestById,
  updateEntity,
} from "./admin.controller";
import checkCategoryDeactivation from "../../middlewares/mw.Category";
import checkStoreDeactivation from "../../middlewares/mw.Store";

export const adminRoutes: Router = Router();

// User CRUD operations
adminRoutes.get("/users/:id", getEntityById(Models.User));
adminRoutes.get("/users", getAllEntity(Models.User));
adminRoutes.put("/users/:id", updateEntity(Models.User));
adminRoutes.delete("/users/:id", deleteUser);
adminRoutes.get(
  "/fields/users/:id",
  getEntityById(Models.User, "employeeFields.stores")
);
adminRoutes.get(
  "/fields/users",
  getAllEntity(Models.User, "employeeFields.stores")
);

// Store CRU operations
adminRoutes.post("/stores", createEntity(Models.Store)); // validate validateStore
adminRoutes.get("/stores/:id", getEntityById(Models.Store));
adminRoutes.get("/stores", getAllEntity(Models.Store));
adminRoutes.put(
  "/stores/:id",
  checkStoreDeactivation,
  updateEntity(Models.Store)
);

// Category CRU operations
adminRoutes.post("/categories", createEntity(Models.Category)); // validate validateCategory
adminRoutes.get("/categories/:id", getEntityById(Models.Category));
adminRoutes.get("/categories", getAllEntity(Models.Category));
adminRoutes.put(
  "/categories/:id",
  checkCategoryDeactivation,
  updateEntity(Models.Category)
);
adminRoutes.get(
  "/fields/categories",
  getAllEntity(Models.Category, ["products", "products.categories"])
);
adminRoutes.get(
  "/fields/categories/:id",
  getEntityById(Models.Category, ["products", "products.categories"])
);

// Product CRU operations
adminRoutes.post("/products", createEntity(Models.Product));
adminRoutes.get("/products", getAllEntity(Models.Product));
adminRoutes.get("/products/:id", getEntityById(Models.Product));
adminRoutes.put("/products/:id", updateEntity(Models.Product));

// Product CRU operations
adminRoutes.post("/requests", createEntity(Models.Request));
adminRoutes.get("/requests", getAllEntity(Models.Request));
adminRoutes.get("/requests/:id", getRequestById(Models.Request));
adminRoutes.put("/requests/:id", updateEntity(Models.Request));
adminRoutes.post("/requests/check", getCheckRequest);
