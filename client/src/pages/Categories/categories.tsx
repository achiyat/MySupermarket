import React from "react";
import { User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { DataTable } from "../../components/DataTable/dataTable";

export const Categories: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  if (!user) console.log("");

  const categories = [
    {
      id: "1",
      name: "Dairy",
      products: [
        { id: "1", name: "aaa", active: true },
        { id: "2", name: "bbb", active: true },
      ],
      active: false,
    },
    {
      id: "2",
      name: "Snacks",
      products: [
        { id: "1", name: "ccc", active: true },
        { id: "2", name: "ddd", active: true },
        { id: "3", name: "uuu", active: true },
      ],
      active: true,
    },
    {
      id: "3",
      name: "Beverages",
      products: [
        { id: "1", name: "eee", active: true },
        { id: "2", name: "rrr", active: true },
      ],
      active: false,
    },
    {
      id: "4",
      name: "Fruits & Vegetables",
      products: [{ id: "1", name: "yyy", active: true }],
      active: false,
    },
    {
      id: "5",
      name: "Cleaning Products",
      products: [
        { id: "1", name: "ggg", active: true },
        { id: "2", name: "hhh", active: true },
      ],
      active: true,
    },
  ];

  return (
    <div>
      <DataTable pageType="categories" data={categories} />
    </div>
  );
};
