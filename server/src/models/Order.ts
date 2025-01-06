// // server/src/models/Order.ts
// import mongoose, { Schema, Document, Model } from "mongoose";

// interface IOrder extends Document {
//   buyerUserId: string;
//   storeId: string;
//   deliveryAddress: string;
//   products: {
//     id: string;
//     amount: number;
//     price: number;
//   }[];
//   totalOrderPrice: number;
//   status: "New" | "In Progress" | "Delivered" | "Canceled";
//   dateCreated: Date;
//   dateLastUpdated: Date;
// }

// const OrderSchema: Schema<IOrder> = new Schema({
//   buyerUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   storeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Store",
//     required: true,
//   },
//   deliveryAddress: { type: String, required: true },
//   products: [
//     {
//       id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       amount: { type: Number, required: true },
//       price: { type: Number, required: true },
//     },
//   ],
//   totalOrderPrice: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ["New", "In Progress", "Delivered", "Canceled"],
//     required: true,
//   },
//   dateCreated: { type: Date, default: Date.now },
//   dateLastUpdated: { type: Date, default: Date.now },
// });

// const Order: Model<IOrder> = mongoose.model("Order", OrderSchema);
// export { Order, IOrder };
