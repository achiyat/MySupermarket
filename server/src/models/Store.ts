// server/src/models/Store.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { User } from "./User";

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

StoreSchema.post("findOneAndUpdate", async function (doc: any, next: any) {
  // Check if trying to inactivate the store with active products

  if (doc) {
    if (doc.active === false) {
      // const activeProducts = await Product.find({ store: doc._id, active: true });
      const activeProducts = [1, 2];
      if (activeProducts.length > 0)
        return next(
          new Error("Cannot inactivate the store with active products")
        );
    }
  }

  next();
});

const Store: Model<IStore> = mongoose.model("Store", StoreSchema);
export { Store, IStore };
