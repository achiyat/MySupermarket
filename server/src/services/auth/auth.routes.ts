// src/services/auth/auth.routes.ts
import { Router } from "express";
import { register, login, protectedRoute } from "./auth.controller";
import { authenticateToken } from "./auth.middlewares";

const router = Router();

router.post("/register", register); // validateUser
router.post("/login", login);
router.get("/protected", authenticateToken, protectedRoute);
export default router;
