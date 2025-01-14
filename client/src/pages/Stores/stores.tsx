// client/src/pages/Stores/stores.tsx
import React, { useEffect, useState } from "react";
import { Store, User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { DataTable } from "../../components/DataTable/dataTable";
import { getAllStores } from "../../services/api";

export const Stores: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  if (!user) console.log("user is null");

  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await getAllStores();
      if (response && Array.isArray(response)) {
        setStores(response);
      }
    };
    fetchStores();
  }, []);

  return (
    <div>
      <DataTable pageType="stores" data={stores} />
    </div>
  );
};
