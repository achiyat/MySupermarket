// src/services/auth/auth.controller.ts
import { Request, Response } from "express";
import User from "../../models/User";
import authService from "./auth.service";

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await authService.register(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

// Login user and generate a token
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password); // Generate the JWT token
    res.status(200).json({ token }); // Return the token to the client
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Error retrieving users" });
  }
};

// Get user by ID (without password)
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password field
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user); // Return user data
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    if (!user) {
      res.status(401).json({ message: "Unauthorized access" });
    } else {
      res.status(200).json({
        message: "This is a protected route",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
