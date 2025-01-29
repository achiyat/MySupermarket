// src/services/auth/auth.routes.ts
import { Router } from "express";
import { login, protectedRoute } from "./auth.controller";
import { authenticateToken } from "./auth.middlewares";
import { createEntity } from "../admin/admin.controller";
import { Models } from "../../utils";
import { validateUser } from "../../middlewares/mw.user";

const router = Router();

router.post("/register", validateUser, createEntity(Models.User));
router.post("/login", login);
router.get("/protected", authenticateToken, protectedRoute);
export default router;
