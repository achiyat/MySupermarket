import React from "react";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { DataTable } from "../../components/DataTable/dataTable";

export const Users: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  if (!user) console.log("");

  const users = [
    {
      username: "employee1",
      email: "employee1@example.com",
      password: "pass123",
      role: "employee",
      active: true,
    },
    {
      username: "employee2",
      email: "employee2@example.com",
      password: "password456",
      role: "employee",
      active: false,
    },
    {
      username: "buyer",
      email: "buyer@example.com",
      password: "buyer789",
      role: "buyer",
      active: true,
    },
  ];

  return (
    <div>
      <DataTable pageType="users" data={users} />
    </div>
  );
};
