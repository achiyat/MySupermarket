// client/src/Interfaces/interfaces.ts
// import { ObjectId } from "bson";
import { Role } from "../types/types";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  image: string;
  quantityInStock: number;
  lastUpdated: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
  __v: number;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  role: Role;
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
