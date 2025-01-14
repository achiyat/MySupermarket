// server/src/models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { UpdateQuery } from "mongoose";
import { Category } from "./Category";

interface IProduct extends Document {
  store: mongoose.Types.ObjectId;
  name: string;
  description: string;
  categories: string[];
  price: number;
  sale?: {
    price: number;
    fromDate: Date;
    toDate: Date;
  };
  images: string[];
  lastUpdateDate: Date;
  numberInStock: number;
  active: boolean;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        default: [],
      },
    ],
    price: { type: Number, required: true },
    sale: {
      price: { type: Number },
      fromDate: { type: Date },
      toDate: { type: Date },
    },
    images: [{ type: [String], default: [] }],
    lastUpdateDate: { type: Date, default: Date.now },
    numberInStock: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { collection: "products" }
);

// Middleware for validating sale fields before saving a new product
ProductSchema.pre("save", async function (next) {
  const product = this as IProduct;

  try {
    // Check for duplicate product in the same store
    const existingProduct = await Product.findOne({
      store: product.store,
      name: product.name,
      active: true,
    });

    if (existingProduct)
      return next(
        new Error("A product with the same name already exists in this store.")
      );
  } catch (error) {
    return next(new Error("Cannot find products"));
  }

  // Validate sale fields
  validateSaleFields(product.sale, next);

  try {
    // Bulk update categories
    await Category.updateMany(
      { _id: { $in: product.categories } },
      { $push: { products: product._id } }
    );
  } catch (error) {
    return next(new Error("Cannot update categories with the new product"));
  }

  next();
});

// Middleware for validating sale fields before updating a product
ProductSchema.pre("findOneAndUpdate", async function (next) {
  const product = this.getUpdate() as UpdateQuery<any>;

  if (product.active === false) {
    try {
      // Remove the product from the products array
      await Category.updateMany(
        { _id: { $in: product.categories } },
        { $pull: { products: product._id } }
      );
    } catch (error) {
      return next(new Error("Error removing the product from categories"));
    }
  }

  // Validate sale fields
  validateSaleFields(product.sale, next);
});

const validateSaleFields = (sale: any, next: any) => {
  const existingSale = sale && (sale.price || sale.fromDate || sale.toDate);

  if (existingSale) {
    const { price, fromDate, toDate } = sale;

    if (!price || !fromDate || !toDate) {
      return next(
        new Error("All sale fields must be populated when a sale is specified.")
      );
    }

    if (new Date(fromDate) > new Date(toDate)) {
      return next(new Error("Sale start date must not be after end date."));
    }
  }
  next();
};

// Unique compound index to ensure no duplicate product name within the same store
ProductSchema.index({ store: 1, name: 1 }, { unique: true });

const Product: Model<IProduct> = mongoose.model("Product", ProductSchema);
export { Product, IProduct };
