// client/src/Interfaces/interfaces.ts
import { ObjectId } from "bson";
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
  _id: ObjectId;
  name: string;
  email: string;
  id_auth0: string;
  role: Role;
}

export interface UserFormData {
  name: string;
  email: string;
  id_auth0: string;
  role: Role;
}
