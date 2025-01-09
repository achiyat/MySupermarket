// server/src/services/admin/admin.controller.ts
import { Request, Response } from "express";
import { getAll, getById, resError, update } from "./admin.common";
import { User } from "../../models/User";
import { respond } from "./admin.middlewares";
import mongoose from "mongoose";
import { Models } from "../../utils";
import { create } from "./admin.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await create(Models.User, req, res);
    res.status(200).json(user);
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getById(Models.User, req, res);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json(resError(error));
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await getAll(Models.User, req, res);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(resError(error));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await update(Models.User, req, res);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
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

export const createStore = async (req: Request, res: Response) => {
  try {
    const store = await create(Models.Store, req, res);
    res.status(200).json(store);
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await getAll(Models.Store, req, res);
    res.status(200).json(stores);
  } catch (error) {
    res.status(404).json(resError(error));
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const store = await getById(Models.Store, req, res);
    res.status(200).json(store);
  } catch (error) {
    console.log(error);
    res.status(404).json(resError(error));
  }
};

export const updateStore = async (req: Request, res: Response) => {
  try {
    const store = await update(Models.Store, req, res);
    res.status(200).json(store);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await create(Models.Category, req, res);
    res.status(200).json(category);
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAll(Models.Category, req, res);
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json(resError(error));
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await getById(Models.Category, req, res);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(404).json(resError(error));
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await update(Models.Category, req, res);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUserWithStores = async (req: Request, res: Response) => {
  try {
    const user = await getById(Models.User, req, res, "employeeFields.stores");
    if (!user) respond(res, 404, "User not found");
    if (user) res.status(200).json(user);
  } catch (error) {
    res.status(404).json(resError(error));
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await create(Models.Product, req, res);
    res.status(200).json(product);
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAll(Models.Product, req, res);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(resError(error));
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await getById(Models.Product, req, res);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json(resError(error));
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await update(Models.Product, req, res);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// const _user = user.toObject();
// delete _user.password;
