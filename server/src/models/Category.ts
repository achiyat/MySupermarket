// server/src/models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface ICategory extends Document {
  name: string;
  mainCategoryId: string | mongoose.Schema.Types.ObjectId;
  active: boolean;
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  mainCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  active: { type: Boolean, default: true },
});

const Category: Model<ICategory> = mongoose.model("Category", CategorySchema);
export { Category, ICategory };
