import mongoose, { Schema, Document } from "mongoose";

type Status = "pending" | "approved" | "rejected";

// Define the Request interface
interface IRequest extends Document {
  type: string;
  status: Status;
  fromUser: mongoose.Types.ObjectId;
  username: string;
  data: mongoose.Types.ObjectId;
  created_at: Date;
  message?: string;
}

// Define the schema
const RequestSchema: Schema<IRequest> = new Schema(
  {
    type: { type: String, required: true },
    status: { type: String, required: true },
    fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    created_at: { type: Date, default: Date.now },
    message: { type: String },
  },
  { collection: "requests" }
);

// Create the Request model
const Request = mongoose.model<IRequest>("Request", RequestSchema);

export { Request, IRequest };
