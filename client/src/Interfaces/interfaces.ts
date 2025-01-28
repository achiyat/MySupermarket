// client/src/Interfaces/interfaces.ts
import { Role, Status } from "../types/types";

export interface Request {
  _id?: string;
  type: string;
  status: Status;
  fromUser: string;
  username: string;
  data: User | Store | Category;
  created_at: string;
  message?: string;
  active?: boolean;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
  phone: string;
  address?: string;
  active?: boolean;
  employeeFields?: {
    stores: Store[];
  };
  __v?: number;
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

export interface Request {
  _id?: string;
  type: string;
  status: Status;
  fromUser: string;
  username: string;
  data: User | Store | Category;
  created_at: string;
  message?: string;
}

export interface Check {
  _id: string;
  response: string;
  message: string;
}
