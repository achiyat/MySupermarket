// server/src/utils.ts
import { Model, Document } from "mongoose";
import { IUser, User } from "./models/User";
import { ICategory, Category } from "./models/Category";
import { IStore, Store } from "./models/Store";
import { IProduct, Product } from "./models/Product";

// Remove Document from the union type since it's handled separately
export type ModelDocument = IUser | ICategory | IStore | IProduct;

export const Models = {
  User: User as Model<IUser>,
  Category: Category as Model<ICategory>,
  Store: Store as Model<IStore>,
  Product: Product as Model<IProduct>,
} as const;

export type ModelKeys = keyof typeof Models;
export type ModelType = (typeof Models)[ModelKeys];

export const resError = (error: any) => {
  const err = error as Error;
  // console.log(err.message);
  console.log(err);
  return err.message;
};

// // server/src/utils.ts
// import { Category } from "./models/Category";
// import { Product } from "./models/Product";
// import { Store } from "./models/Store";
// import { User } from "./models/User";

// // Store models as part of a constant object instead of the enum
// export const Models = {
//   User,
//   Category,
//   Store,
//   Product,
// } as const;

// // Define a type for the keys of the Models object
// export type ModelKeys = keyof typeof Models;

// // server/src/utils.ts
// import { Document, Model as MongooseModel } from "mongoose";

// export interface Models {
//   User: MongooseModel<Document>;
//   Category: MongooseModel<Document>;
//   Store: MongooseModel<Document>;
//   Product: MongooseModel<Document>;
// }
