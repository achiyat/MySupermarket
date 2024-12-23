// client/src/types/types.ts
import { UserFormData } from "../Interfaces/interfaces";
export type Role = "Administrator" | "Employee" | "Customer";

export const DefaultFormData: UserFormData = {
  name: "",
  email: "",
  id_auth0: "",
  role: "Customer",
};
