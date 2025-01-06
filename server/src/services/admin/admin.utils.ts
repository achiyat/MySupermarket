// server/src/services/admin/admin.utils.ts
import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { User } from "../../models/User";
import { Category } from "../../models/Category";
import { Store } from "../../models/Store";
import { MongoServerError } from "mongodb";
import { respond } from "./admin.middlewares";

export const resError = (error: any) => {
  const err = error as Error;
  return err.message;
};

export const create = {
  user: async (req: Request, res: Response) => {
    try {
      const user = await adminService.create(User, req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },

  category: async (req: Request, res: Response) => {
    try {
      const category = await adminService.create(Category, req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },

  store: async (req: Request, res: Response) => {
    try {
      const store = await adminService.create(Store, req.body);
      return res.status(201).json(store);
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },
};

// Get All operations
export const getAll = {
  user: async (req: Request, res: Response) => {
    try {
      const users = await adminService.getAll(User);
      return users;
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },

  category: async (req: Request, res: Response) => {
    try {
      const categories = await adminService.getAll(Category);
      return categories;
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },

  store: async (req: Request, res: Response) => {
    try {
      const stores = await adminService.getAll(Store);
      return stores;
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },
};

// Get By Id operations
export const getById = {
  user: async (req: Request, res: Response) => {
    try {
      const user = await adminService.getById(User, req.params.id);
      return user;
    } catch (error) {
      return res.status(404).json(resError(error));
    }
  },

  category: async (req: Request, res: Response) => {
    try {
      const category = await adminService.getById(Category, req.params.id);
      return category;
    } catch (error) {
      return res.status(404).json(resError(error));
    }
  },

  store: async (req: Request, res: Response) => {
    try {
      const store = await adminService.getById(Store, req.params.id);
      return store;
    } catch (error) {
      return res.status(404).json(resError(error));
    }
  },
};

// Update operations
export const update = {
  user: async (req: Request, res: Response) => {
    try {
      const user = await adminService.update(User, req.params.id, req.body);
      return user;
    } catch (error) {
      if (error instanceof MongoServerError && "code" in error) {
        if (error.code === 11000)
          return respond(res, 409, "username or email already exists.");
      }
      return res.status(400).json(error);
    }
  },

  category: async (req: Request, res: Response) => {
    try {
      const category = await adminService.update(
        Category,
        req.params.id,
        req.body
      );
      return category;
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },

  store: async (req: Request, res: Response) => {
    try {
      const store = await adminService.update(Store, req.params.id, req.body);
      return store;
    } catch (error) {
      return res.status(400).json(resError(error));
    }
  },
};
