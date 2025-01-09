// src/services/auth/auth.controller.ts
import { Request, Response } from "express";
import authService from "./auth.service";
import { resError } from "../../utils";

// Login user and generate a token
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password); // Generate the JWT token
    res.status(200).json({ token: token }); // Return the token to the client
  } catch (error) {
    res.status(500).json(resError(error));
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    if (!user) {
      res.status(401).json({ message: "Unauthorized access" });
    } else {
      res.status(200).json({ token: user.id });
    }
  } catch (error) {
    res.status(500).json(resError(error));
  }
};
