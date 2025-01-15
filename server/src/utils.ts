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
