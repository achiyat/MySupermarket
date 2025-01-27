import { Category, Store, User } from "../Interfaces/interfaces";

interface FieldConfig<T> {
  type: string;
  placeholder?: string;
  label?: string;
  value: keyof T;
}

export const fieldConfig = {
  Users: [
    { type: "text", placeholder: "Name", value: "username" },
    { type: "email", placeholder: "Email", value: "email" },
    { type: "password", placeholder: "Password", value: "password" },
    { type: "text", placeholder: "Phone", value: "phone" },
    { type: "text", placeholder: "Address", value: "address" },
  ] as FieldConfig<User>[],
  Stores: [
    { type: "text", label: "Store Name", value: "name" },
    { type: "text", label: "Branch", value: "branchName" },
    { type: "text", label: "Address", value: "address" },
  ] as FieldConfig<Store>[],
  Categories: [
    { type: "text", label: "Name", value: "name" },
  ] as FieldConfig<Category>[],
};
