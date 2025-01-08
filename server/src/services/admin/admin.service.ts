// server/src/services/admin/admin.service.ts
import { Request, Response } from "express";
import { ModelKeys, Models } from "../../utils";
import { resError } from "./admin.common";

export const create = async (
  Model: (typeof Models)[ModelKeys],
  req: Request,
  res: Response
) => {
  try {
    const result = new Model(req.body);
    await result.save();
    return result;
  } catch (error) {
    return res.status(400).json(resError(error));
  }
};

export const adminService = {
  // create: async (Model: any, data: any) => {
  //   const _data = new Model(data);
  //   return await _data.save();
  // },

  getAll: async (Model: any) => {
    return await Model.find().select("-password").exec();
  },

  getById: async (Model: any, id: string) => {
    return await Model.findById(id).select("-password").exec();
  },

  update: async (Model: any, id: string, data: any) => {
    return await Model.findByIdAndUpdate(id, data, { new: true })
      .select("-password")
      .exec();
  },

  getAllWithPopulate: async (Model: any, fields: string) => {
    return await Model.find().populate(fields).select("-password").exec();
  },

  getByIdWithPopulate: async (Model: any, id: string, fields: string) => {
    return await Model.findById(id).populate(fields).select("-password").exec();
  },
};
