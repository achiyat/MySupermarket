// server/src/models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { Product } from "./Product";

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

  try {
    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name: category.name });
    if (existingCategory) {
      return next(new Error("Category with this name already exists"));
    }
    next();
  } catch (error) {
    return next(new Error("Cannot update administrator's categories"));
  }
});

CategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ICategory>;

  if (update.active === false) {
    try {
      const categoryId = this.getQuery()._id;

      // Step 1: Fetch all products with the category
      const products = await Product.find({ categories: categoryId });

      // Step 2: Filter active and inactive products
      const activeProducts = products.filter((product) => product.active);
      const inactiveProducts = products.filter((product) => !product.active);

      if (activeProducts.length > 0) {
        return next(
          new Error("Cannot deactivate category with active products")
        );
      }

      // Step 3: Remove category from inactive products' categories array
      await Product.updateMany(
        { _id: { $in: inactiveProducts.map((p) => p._id) } },
        { $pull: { categories: categoryId } }
      );

      console.log("Category removed from inactive products' categories array.");
    } catch (error) {
      return next(new Error("Error processing category deactivation"));
    }
  }

  next();
});

const Category: Model<ICategory> = mongoose.model("Category", CategorySchema);
export { Category, ICategory };
