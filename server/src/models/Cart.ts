// // server/src/models/Cart.ts
// import mongoose, { Schema, Document, Model } from "mongoose";

// interface ICart extends Document {
//   userId: string;
//   products: {
//     id: string;
//     amount: number;
//   }[];
// }

// const CartSchema: Schema<ICart> = new Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   products: [
//     {
//       id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       amount: { type: Number, required: true },
//     },
//   ],
// });

// const Cart: Model<ICart> = mongoose.model("Cart", CartSchema);
// export { Cart, ICart };
