// src/services/auth/auth.routes.ts
import { Router } from "express";
import {
  register,
  login,
  getUserById,
  protectedRoute,
  getAllUsers,
} from "./auth.controller";
import { authenticateToken } from "./auth.middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:id", getUserById);
router.get("/users", getAllUsers);
router.get("/protected", authenticateToken, protectedRoute);
export default router;
