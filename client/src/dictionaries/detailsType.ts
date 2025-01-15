import { Category, Store, User } from "../Interfaces/interfaces";

interface PageDetail<T> {
  type: string;
  fields: { label: string; name: string; value: keyof T; type: string }[];
  hesStore: boolean;
  hesProduct: boolean;
}

export type DetailsType = {
  users: PageDetail<User>;
  stores: PageDetail<Store>;
  categories: PageDetail<Category>;
};
// <p>Active: {store.active ? "Yes" : "No"}</p>
export const detailsType: DetailsType = {
  users: {
    type: "users",
    fields: [
      { label: "ID", name: "id", value: "_id", type: "text" },
      { label: "Username", name: "username", value: "username", type: "text" },
      { label: "Email", name: "email", value: "email", type: "email" },
      { label: "Role", name: "role", value: "role", type: "text" },
      { label: "Phone", name: "phone", value: "phone", type: "tel" },
      { label: "Address", name: "address", value: "address", type: "text" },
    ],
    hesStore: true,
    hesProduct: false,
  },
  stores: {
    type: "stores",
    fields: [
      { label: "ID", name: "id", value: "_id", type: "text" },
      { label: "Name", name: "name", value: "name", type: "text" },
      {
        label: "Branch Name",
        name: "branchName",
        value: "branchName",
        type: "text",
      },
      { label: "Address", name: "address", value: "address", type: "text" },
      {
        label: "Employee ID",
        name: "employeeId",
        value: "employeeId",
        type: "text",
      },
    ],
    hesStore: false,
    hesProduct: false,
  },
  categories: {
    type: "categories",
    fields: [
      { label: "ID", name: "id", value: "_id", type: "text" },
      { label: "Name", name: "name", value: "name", type: "text" },
    ],
    hesStore: false,
    hesProduct: true,
  },
};

// interface Field<T> {
//   label: string;
//   name: string;
//   value: keyof T;
//   type: string;
// }
