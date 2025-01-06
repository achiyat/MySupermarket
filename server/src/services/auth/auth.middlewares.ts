// src/services/auth/auth.middlewares.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth.service";
import { User } from "../../models/User";
import { respond } from "../admin/admin.middlewares";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    respond(res, 401, "Token missing");
  } else {
    try {
      const user = verifyToken(token);
      req.body.user = user;
      next();
    } catch (error) {
      respond(res, 403, "Invalid token");
    }
  }
};

// Middleware to verify if the user has admin privileges
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["userid"];
  const user = await User.findById(userId);

  if (user && user.role === "administrator") {
    return next();
  } else {
    respond(res, 400, "Access denied, admin only.");
    return;
  }
};
