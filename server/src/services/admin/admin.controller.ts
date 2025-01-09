// server/src/services/admin/admin.controller.ts
import { Request, Response } from "express";
import { respond } from "./admin.middlewares";
import mongoose, { Model } from "mongoose";
import { create, getAll, getById, update } from "./admin.service";
import { User } from "../../models/User";

// Entity = User/product/category
export const createEntity = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await create(model, req, res);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const getAllEntity = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await getAll(model, req, res);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const getEntityById = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await getById(model, res, req.params.id);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const updateEntity = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await update(model, res, req.params.id, req.body);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return respond(res, 400, "Invalid user ID format");
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) respond(res, 404, "User not found");
    if (user) respond(res, 200, "User deleted successfully");
  } catch (error) {
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

// export const getUserWithStores = async (req: Request, res: Response) => {
//   try {
//     const user = await getById(Models.User, req, res, "employeeFields.stores");
//     if (!user) respond(res, 404, "User not found");
//     if (user) res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json(resError(error));
//   }
// };
