// server/src/models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { User } from "./User";

interface ICategory extends Document {
  name: string;
  products: string[];
  active: boolean;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
    active: { type: Boolean, default: true },
  },
  { collection: "categories" }
);

CategorySchema.pre("save", async function (next) {
  const category = this as ICategory;

  if (category.name.length === 0)
    return next(new Error("Name cannot be empty"));

  if (!Array.isArray(category.products))
    return next(new Error("Products should be an array"));

  // Add the Category to the administrator's categories field
  try {
    const admin = await User.findOne({ role: "administrator" });
    if (!admin) return next(new Error("Administrator not found"));
    await User.findByIdAndUpdate(
      admin._id,
      { $push: { "adminFields.categories": category._id } },
      { new: true }
    );
    next();
  } catch (error) {
    return next(new Error("Cannot update administrator's categories"));
  }
});

CategorySchema.post("findOneAndUpdate", async function (doc: any, next: any) {
  if (doc.active === false) {
    // const activeProducts = await mongoose.model("Product").find({
    //   _id: { $in: doc.products },
    //   active: true,
    // });

    const activeProducts = [];
    if (activeProducts.length > 0) {
      return next(
        new Error("Cannot inactivate category with active products.")
      );
    }
  }

  next();
});

const Category: Model<ICategory> = mongoose.model("Category", CategorySchema);
export { Category, ICategory };
