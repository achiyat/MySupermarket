// server/src/services/admin/admin.controller.ts
import { Request, Response } from "express";
import { respond } from "./admin.middlewares";
import mongoose, { Model } from "mongoose";
import { create, getAll, getById, update } from "./admin.service";
import { User } from "../../models/User";
import { checkRequest } from "../../middlewares/mw.request";

export const createEntity = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await create(model, req.body);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const getAllEntity = <T>(
  model: Model<T & Document>,
  fields?: string | string[]
) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await getAll(model, fields);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const getEntityById = <T>(
  model: Model<T & Document>,
  fields?: string | string[]
) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await getById(model, req.params.id, fields);
      res.status(200).json(entities);
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const updateEntity = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const entities = await update(model, req.params.id, req.body);
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

export const getRequestById = <T>(model: Model<T & Document>) => {
  return async (req: Request, res: Response) => {
    try {
      const requests = await model.find({ fromUser: req.params.id });

      if (requests.length === 0) {
        res.status(404).json({ message: "No requests found for this user." });
      } else {
        res.status(200).json(requests);
      }
    } catch (error) {
      respond(res, 500, "Internal Server Error");
    }
  };
};

export const getCheckRequest = async (req: Request, res: Response) => {
  try {
    // Call the checkRequest function to validate the request
    const { isValid, message, _id } = await checkRequest(req);

    // Prepare the response object
    const response = {
      _id: _id,
      response: isValid ? "approved" : "rejected",
      message: message,
    };

    // Send the response to the client
    res.status(200).json(response);
  } catch (error) {
    respond(res, 500, "Internal Server Error");
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
