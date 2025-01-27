// client/src/dictionaries/requestDetails.ts
import { Category, Request, Store, User } from "../Interfaces/interfaces";

export const isUser = (data: User | Store | Category): data is User => {
  return (data as User).email !== undefined;
};

export const isStore = (data: User | Store | Category): data is Store => {
  return (data as Store).branchName !== undefined;
};

// export const isCategory = (data: User | Store | Category): data is Category => {
//   return (data as Category).products !== undefined;
// };

export const userDetails = (request: Request) => {
  if (isUser(request.data)) {
    return [
      { label: "Name", value: request.username },
      { label: "Email", value: request.data.email },
      { label: "Phone", value: request.data.phone },
      { label: "Role", value: request.data.role },
      { label: "Active", value: request.data.active ? "Yes" : "No" },
    ];
  }
};

export const storeDetails = (request: Request) => {
  if (isStore(request.data)) {
    return [
      { label: "Name", value: request.username },
      { label: "Store Name", value: request.data.name },
      { label: "Branch", value: request.data.branchName },
      { label: "Address", value: request.data.address },
    ];
  }
};
