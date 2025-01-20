// client/src/dictionaries/navbarUsers.ts
import { Role } from "../types/types";
import { links } from "./links";

export const navbarUsers: Record<Role, string[]> = {
  administrator: [
    links.users,
    links.stores,
    links.categories,
    links.permissions,
    links.requests,
  ],
  employee: [links.work, links.settings, links.requests],
  buyer: [links.shopping, links.settings, links.requests],
};
