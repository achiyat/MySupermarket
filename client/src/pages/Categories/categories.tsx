// client/src/pages/Categories/categories.tsx
import React, { useEffect, useState } from "react";
import { Category, User } from "../../Interfaces/interfaces";
import { useOutletContext } from "react-router-dom";
import { DataTable } from "../../components/DataTable/dataTable";
import { getAllCategories } from "../../services/api";

export const Categories: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  if (!user) console.log("user is null");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (response && Array.isArray(response)) {
        setCategories(response);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <DataTable pageType="categories" data={categories} />
    </div>
  );
};
