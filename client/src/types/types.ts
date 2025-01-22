// client/src/types/types.ts
import {
  Category,
  MsgRes,
  Product,
  Store,
  Token,
  User,
} from "../Interfaces/interfaces";
export type Role = "administrator" | "employee" | "buyer";
export type Status = "pending" | "approved" | "rejected";
export type PageType = "users" | "stores" | "categories";
// export type Pages = User | Store | Category;

export type User_Response = User | MsgRes;
export type UsersResponse = User[] | MsgRes;

export type Store_Response = Store | MsgRes;
export type StoresResponse = Store[] | MsgRes;

export type Category_Response = Category | MsgRes;
export type CategoriesResponse = Category[] | MsgRes;

export type Product_Response = Product | MsgRes;
export type ProductsResponse = Product[] | MsgRes;

export type TokenResponse = Token | MsgRes;

// export const DefaultFormData: SignUpData = {
//   username: "",
//   email: "",
//   password: "",
//   role: "buyer",
// };
