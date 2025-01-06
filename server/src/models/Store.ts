// server/src/models/Store.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface IStore extends Document {
  name: string;
  branchName: string;
  address: string;
  active: boolean;
}

const StoreSchema: Schema<IStore> = new Schema({
  name: { type: String, required: true },
  branchName: { type: String, required: true },
  address: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const Store: Model<IStore> = mongoose.model("Store", StoreSchema);
export { Store, IStore };
