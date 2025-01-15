// client/src/Interfaces/interfaces.ts
import { Role } from "../types/types";

// export interface User {
//   _id?: string;
//   username: string;
//   email: string;
//   password: string;
//   role: Role;
//   phone: string;
//   address?: string;
//   active?: boolean;
//   employeeFields?: {
//     stores: string[];
//   };
//   __v?: number;
// }

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  address?: string;
  active?: boolean;
  employeeFields?: {
    stores: Store[];
  };
  __v?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface MsgRes {
  message: string;
}

export interface Store {
  _id?: string;
  name: string;
  branchName: string;
  address: string;
  employeeId: string;
  active?: boolean;
  __v?: number;
}

export interface Category {
  _id?: string;
  name: string;
  products: string[];
  active?: boolean;
  __v?: number;
}

export interface Product {
  _id?: string;
  store: string;
  name: string;
  description?: string;
  categories: string[];
  price: number;
  sale?: {
    price: number;
    fromDate: Date;
    toDate: Date;
  };
  images?: string[];
  lastUpdateDate?: Date;
  numberInStock?: number;
  active?: boolean;
  __v?: number;
}
