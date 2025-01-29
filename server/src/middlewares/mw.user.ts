import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { respond } from "../services/admin/admin.middlewares";

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const errors: { username?: string; email?: string; password?: string } = {};

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      if (existingUser.username === username)
        errors.username = "Name is already taken.";
      if (existingUser.email === email)
        errors.email = "Email is already in use.";
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ message: errors });
      return;
    }

    next();
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};
