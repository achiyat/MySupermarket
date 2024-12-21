// client/src/dictionaries/users.ts
import { Role } from "../types/types";

export const users: Record<
  string,
  { firstName: string; lastName: string; email: string; role: Role }
> = {
  "auth0|676439a86055ced20a3a7e37": {
    firstName: "John",
    lastName: "Doe",
    email: "admin@example.com",
    role: "Administrator",
  },
  "auth0|6764276c85ffcfa7cf0dc7a9": {
    firstName: "Jane",
    lastName: "Smith",
    email: "employee@example.com",
    role: "Employee",
  },
  "auth0|67643b296055ced20a3a7f47": {
    firstName: "Alice",
    lastName: "Brown",
    email: "customer@example.com",
    role: "Customer",
  },
};
