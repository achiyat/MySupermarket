import { Role } from "../types/types";

// client/src/dictionaries/navbarUsers.ts
export const navbarUsers: Record<Role, string[]> = {
  Administrator: ["home", "profile", "management"],
  Employee: ["home", "profile", "work"],
  Customer: ["home", "profile", "store"],
};
