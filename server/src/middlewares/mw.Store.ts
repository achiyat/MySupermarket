// server/src/middlewares/mw.store.ts
import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import { respond } from "../services/admin/admin.middlewares";

const checkStoreDeactivation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.body;

    // Fetch products under this store and Check if any active products exist
    const activeProducts = await Product.find({
      store: _id,
      active: true,
    });

    if (activeProducts.length > 0) {
      res
        .status(400)
        .json({ message: "Cannot deactivate store with active products" });
      return;
    }

    next();
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};

export default checkStoreDeactivation;
