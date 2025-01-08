// src/services/auth/auth.controller.ts
import { Request, Response } from "express";
import authService from "./auth.service";
import { User } from "../../models/User";
import { adminService } from "../admin/admin.service";
import { resError } from "../admin/admin.common";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const user = await adminService.create(User, req.body);
    const _user = user.toObject();
    delete _user.password;
    res.status(201).json(_user);
  } catch (error) {
    res.status(400).json(resError(error));
  }
};

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

// // Get all users
// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find().select("-password");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ message: "Error retrieving users" });
//   }
// };

// // Get user by ID (without password)
// export const getUserById = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password"); // Exclude password field
//     if (!user) {
//       res.status(404).send({ message: "User not found" });
//     } else {
//       res.status(200).json(user); // Return user data
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user" });
//   }
// };
