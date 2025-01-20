// client/src/dictionaries/navbarUsers.ts
import { Role } from "../types/types";
import { links } from "./links";

export const navbarUsers: Record<Role, string[]> = {
  administrator: [
    links.users,
    links.stores,
    links.categories,
    links.permissions,
  ],
  employee: [links.home, links.settings, links.work],
  buyer: [links.home, links.settings, links.shopping],
};
