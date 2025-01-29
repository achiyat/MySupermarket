// server/src/middlewares/middlewares.user.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { respond } from "../services/admin/admin.middlewares";

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email } = req.body;
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      const errors: { username?: string; email?: string } = {};

      if (existingUser.username === username) {
        errors.username = "Name is already taken.";
      }
      if (existingUser.email === email) {
        errors.email = "Email is already in use.";
      }

      res.status(400).json({ message: errors });
      return;
    }

    next();
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};
