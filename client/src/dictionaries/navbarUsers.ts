// client/src/dictionaries/navbarUsers.ts
import { Role } from "../types/types";

export const navbarUsers: Record<Role, string[]> = {
  administrator: [
    "home",
    "profile",
    "users",
    "category",
    "stores",
    "permissions",
    "management",
  ],
  employee: ["home", "profile", "work"],
  buyer: ["home", "profile", "store"],
};
