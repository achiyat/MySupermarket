// server/src/utils.ts
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { Store } from "./models/Store";
import { User } from "./models/User";

// Store models as part of a constant object instead of the enum
export const Models = {
  User,
  Category,
  Store,
  Product,
} as const;

// Define a type for the keys of the Models object
export type ModelKeys = keyof typeof Models;

// // server/src/utils.ts
// import { Document, Model as MongooseModel } from "mongoose";

// export interface Models {
//   User: MongooseModel<Document>;
//   Category: MongooseModel<Document>;
//   Store: MongooseModel<Document>;
//   Product: MongooseModel<Document>;
// }
