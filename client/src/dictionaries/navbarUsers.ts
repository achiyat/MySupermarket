// client/src/dictionaries/navbarUsers.ts
import { Role } from "../types/types";
import { links } from "./links";

export const navbarUsers: Record<Role, string[]> = {
  administrator: [links.users, links.stores, links.categories, links.approvals],
  employee: [
    links.work,
    links.settings,
    links.createProduct,
    links.myProducts,
    links.requests,
  ],
  buyer: [links.shopping, links.settings],
};
