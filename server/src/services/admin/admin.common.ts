// server/src/services/admin/admin.utils.ts
import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { MongoServerError } from "mongodb";
import { ModelKeys, Models } from "../../utils";

export const resError = (error: any) => {
  const err = error as Error;
  // console.log(err);
  return err.message;
};

// Create operations
// export const create = async (
//   model: (typeof Models)[ModelKeys],
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const data = await adminService.create(model, req.body);
//     return res.status(201).json(data);
//   } catch (error) {
//     return res.status(400).json(resError(error));
//   }
// };

// Get All operations
export const getAll = async (
  model: (typeof Models)[ModelKeys],
  req: Request,
  res: Response,
  fields?: string
) => {
  try {
    const data = fields
      ? await adminService.getAllWithPopulate(model, fields)
      : await adminService.getAll(model);
    return data;
  } catch (error) {
    return res.status(400).json(resError(error));
  }
};

// Get By Id operations
export const getById = async (
  model: (typeof Models)[ModelKeys],
  req: Request,
  res: Response,
  fields?: string
) => {
  try {
    const data = fields
      ? await adminService.getByIdWithPopulate(model, req.params.id, fields)
      : await adminService.getById(model, req.params.id);
    return data;
  } catch (error) {
    return res.status(400).json(resError(error));
  }
};

// Update operations
export const update = async (
  model: (typeof Models)[ModelKeys],
  req: Request,
  res: Response
) => {
  try {
    const data = await adminService.update(model, req.params.id, req.body);
    return data;
  } catch (error) {
    if (error instanceof MongoServerError && "code" in error) {
      if (error.code === 11000)
        return res
          .status(409)
          .json({ message: "Conflict: Username or email already exists." });
    }
    return res.status(400).json(resError(error));
  }
};
