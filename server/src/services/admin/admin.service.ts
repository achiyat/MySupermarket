// server/src/services/admin/admin.service.ts
import { Request, Response } from "express";
import { Model } from "mongoose";
import { MongoServerError } from "mongodb";
import { resError } from "../../utils";

export const create = async <T>(
  model: Model<T & Document>,
  req: Request,
  res: Response
) => {
  try {
    const result = new model(req.body);
    await result.save();
    return result;
  } catch (error) {
    return res.status(400).json(resError(error));
  }
};

export const getAll = async <T>(
  model: Model<T & Document>,
  req: Request,
  res: Response,
  fields?: string
) => {
  try {
    const query = fields
      ? Model.find().populate(fields).select("-password")
      : Model.find().select("-password");

    const data = await query.exec();
    return data;
  } catch (error) {
    return res.status(400).json(resError(error));
  }
};

export const getById = async <T>(
  model: Model<T & Document>,
  res: Response,
  id: string,
  fields?: string
) => {
  try {
    const query = fields
      ? model.findById(id).populate(fields).select("-password")
      : model.findById(id).select("-password");

    const data = await query.exec();
    return data;
  } catch (error) {
    return res.status(400).json(resError(error));
  }
};

export const update = async <T>(
  model: Model<T & Document>,
  res: Response,
  id: string,
  body: any
) => {
  try {
    const data = await model
      .findByIdAndUpdate(id, body, {
        new: true,
      })
      .select("-password")
      .exec();
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
