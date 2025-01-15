interface HeaderMapping {
  [key: string]: { [key: string]: string };
}

export const headerMapping: HeaderMapping = {
  users: {
    username: "Name",
    email: "Email",
    role: "Type",
    active: "Active",
    showDetails: "Details",
  },
  stores: {
    name: "Name",
    branchName: "Branch",
    address: "Address",
    active: "Active",
    showDetails: "Details",
  },
  categories: {
    name: "Name",
    productCount: "Product Count",
    active: "Active",
    showDetails: "Details",
  },
};
