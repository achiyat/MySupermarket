// server/src/services/admin/admin.service.ts
import { Model } from "mongoose";
import { MongoServerError } from "mongodb";
import { resError } from "../../utils";

export const create = async <T>(model: Model<T & Document>, body: any) => {
  try {
    const result = new model(body);
    await result.save();
    return result;
  } catch (error) {
    throw new Error(resError(error));
  }
};

export const getAll = async <T>(
  model: Model<T & Document>,
  fields?: string | string[]
) => {
  try {
    const query = model
      .find()
      .populate(fields || [])
      .select("-password");

    return await query.exec();
  } catch (error) {
    throw new Error(resError(error));
  }
};

export const getById = async <T>(
  model: Model<T & Document>,
  id: string,
  fields?: string | string[]
) => {
  try {
    const query = model
      .findById(id)
      .populate(fields || [])
      .select("-password");

    return await query.exec();
  } catch (error) {
    throw new Error(resError(error));
  }
};

export const update = async <T>(
  model: Model<T & Document>,
  id: string,
  body: any
) => {
  try {
    return await model
      .findByIdAndUpdate(id, body, {
        new: true,
      })
      .select("-password")
      .exec();
  } catch (error) {
    if (error instanceof MongoServerError && "code" in error) {
      if (error.code === 11000)
        throw new Error("Conflict: Username or email already exists.");
    }
    throw new Error(resError(error));
  }
};
