import React from "react";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { DataTable } from "../../components/DataTable/dataTable";

export const Stores: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  if (!user) console.log("");

  const stores = [
    {
      name: "Tech Store",
      branchName: "Main Branch",
      address: "123 Tech Avenue",
      employeeId: "abc12345",
      active: true,
    },
    {
      name: "Book Haven",
      branchName: "Downtown",
      address: "456 Book Street",
      employeeId: "def67890",
      active: true,
    },
    {
      name: "Gadget World",
      branchName: "City Center",
      address: "789 Gadget Lane",
      employeeId: "ghi11223",
      active: false,
    },
  ];

  return (
    <div>
      <DataTable pageType="stores" data={stores} />
    </div>
  );
};
