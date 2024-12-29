// src/services/auth/auth.middlewares.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth.service";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send("Token missing");
  } else {
    try {
      const user = verifyToken(token);
      req.body.user = user;
      next();
    } catch (error) {
      res.status(403).send("Invalid token");
    }
  }
};
