// server/src/models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface ICategory extends Document {
  name: string;
  products: string[];
  active: boolean;
}

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
  ],
  active: { type: Boolean, default: true },
});

CategorySchema.pre("save", async function (next) {
  const category = this as ICategory;

  console.log(category);

  if (category.name.length === 0)
    return next(new Error("Name cannot be empty"));

  if (!Array.isArray(category.products))
    return next(new Error("Products should be an array"));
});

CategorySchema.post("findOneAndUpdate", async function (doc: any, next: any) {
  if (doc.active === false) {
    // const activeProducts = await mongoose.model("Product").find({
    //   _id: { $in: doc.products },
    //   active: true,
    // });

    const activeProducts = [1, 2];
    if (activeProducts.length > 0) {
      return next(
        new Error("Cannot inactivate category with active products.")
      );
    }
  }

  next();
});

const Category: Model<ICategory> = mongoose.model("categories", CategorySchema);
export { Category, ICategory };
