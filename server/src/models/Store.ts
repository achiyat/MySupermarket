// server/src/models/Store.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { User } from "./User";
import { Product } from "./Product";

interface IStore extends Document {
  name: string;
  branchName: string;
  address: string;
  employeeId: mongoose.Types.ObjectId;
  active: boolean;
}

const StoreSchema: Schema<IStore> = new Schema(
  {
    name: { type: String, required: true },
    branchName: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  { collection: "stores" }
);

StoreSchema.pre("save", async function (next) {
  const store = this as IStore;

  const existingUser = await Store.findOne({
    address: store.address,
  });
  if (existingUser) {
    // if (existingUser.branchName === store.branchName)
    //   return next(new Error("Store with the same branch name already exists"));
    if (existingUser.address === store.address)
      return next(new Error("Store with the same address already exists"));
  }

  // Add the store to the employee's stores field
  try {
    await User.findByIdAndUpdate(
      store.employeeId,
      { $push: { "employeeFields.stores": store._id } },
      { new: true }
    );
    next();
  } catch (error) {
    return next(new Error("Cannot update employee's stores"));
  }
});

// Middleware to check if the store has active products before deactivating the store
StoreSchema.pre("findOneAndUpdate", async function (next) {
  const store = this.getUpdate() as Partial<IStore>;

  if (store.active === false) {
    try {
      const storeId = this.getQuery()._id;
      // Check if there are any active products associated with this store
      const activeProducts = await Product.find({
        store: storeId,
        active: true,
      });

      if (activeProducts.length > 0) {
        return next(new Error("Cannot deactivate store with active products"));
      }
    } catch (error) {
      return next(new Error("Error checking for active products in the store"));
    }
  }

  next();
});

const Store: Model<IStore> = mongoose.model("Store", StoreSchema);
export { Store, IStore };
