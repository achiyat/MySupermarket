// client/src/pages/Users/users.tsx
import React, { useEffect, useState } from "react";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { DataTable } from "../../components/DataTable/dataTable";
import { getAllUsers } from "../../services/api";

export const Users: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  if (!user) console.log("user is null");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response && Array.isArray(response)) {
        setUsers(response);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <DataTable pageType="users" data={users} />
    </div>
  );
};
