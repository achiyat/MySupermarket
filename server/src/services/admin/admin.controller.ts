// server/src/services/admin/admin.controller.ts
import { Request, Response } from "express";
import { create, getAll, getById, resError, update } from "./admin.utils";
import { User } from "../../models/User";
import { respond } from "./admin.middlewares";
import mongoose from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  try {
    await create.user(req, res);
  } catch (error) {
    res.status(400).json(resError(error));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getById.user(req, res);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json(resError(error));
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await getAll.user(req, res);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(resError(error));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await update.user(req, res);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     console.log(user);
//     if (!user) respond(res, 404, "User not found");
//     if (user) respond(res, 200, "User deleted successfully");
//   } catch (error) {
//     console.log(error);
//     respond(res, 500, "Internal Server Error");
//   }
// };

export const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return respond(res, 400, "Invalid user ID format");
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return respond(res, 404, "User not found");
    }

    respond(res, 200, "User deleted successfully");
  } catch (error) {
    console.error(error); // Log the error for debugging

    // Type assertion for error
    if (
      error instanceof mongoose.Error.CastError &&
      error.kind === "ObjectId"
    ) {
      respond(res, 400, "Invalid user ID");
    } else {
      respond(res, 500, "Internal Server Error");
    }
  }
};

// const _user = user.toObject();
// delete _user.password;
