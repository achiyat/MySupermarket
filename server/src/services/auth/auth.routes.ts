// src/services/auth/auth.routes.ts
import { Router } from "express";
import { login, protectedRoute } from "./auth.controller";
import { authenticateToken } from "./auth.middlewares";
import { createEntity } from "../admin/admin.controller";
import { Models } from "../../utils";

const router = Router();

router.post("/register", createEntity(Models.User)); // validateUser
router.post("/login", login);
router.get("/protected", authenticateToken, protectedRoute);
export default router;
