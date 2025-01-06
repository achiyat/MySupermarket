// client/src/dictionaries/navbarUsers.ts
import { Role } from "../types/types";

export const navbarUsers: Record<Role, string[]> = {
  Administrator: ["home", "profile", "permissions", "management"],
  Employee: ["home", "profile", "work"],
  Buyer: ["home", "profile", "store"],
};
