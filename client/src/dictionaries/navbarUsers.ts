// client/src/dictionaries/navbarUsers.ts
import { Role } from "../types/types";
import { links } from "./links";

export const navbarUsers: Record<Role, string[]> = {
  administrator: [
    links.users,
    links.stores,
    links.categories,
    // "permissions",
    // "management",
  ],
  employee: [links.home, links.profile, links.work],
  buyer: [links.home, links.profile, links.shopping],
};
