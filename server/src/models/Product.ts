// server/src/models/Product.ts
import mongoose, { Schema, Document, Model } from "mongoose";

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
      ref: "Store",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    categories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: [] },
    ],
    price: { type: Number, required: true },
    sale: {
      price: Number,
      fromDate: Date,
      toDate: Date,
    },
    images: [{ type: String, default: [] }],
    lastUpdateDate: { type: Date, default: Date.now },
    numberInStock: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { collection: "products" }
);

const Product: Model<IProduct> = mongoose.model("Product", ProductSchema);
export { Product, IProduct };
