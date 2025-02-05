// server/src/middlewares/mw.Category.ts
import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import { respond } from "../services/admin/admin.middlewares";

const checkCategoryDeactivation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id } = req.body;

    // Fetch products under this category
    const products = await Product.find({ categories: _id });

    // Check if any active products exist
    const hasActiveProducts = products.some((product) => product.active);
    if (hasActiveProducts) {
      res
        .status(400)
        .json({ message: "Cannot deactivate category with active products" });
      return;
    }

    next();
  } catch (error) {
    respond(res, 500, "Internal Server Error");
  }
};

export default checkCategoryDeactivation;
