import React from "react";
import "./filter.css";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  [key: string]: {
    key: string;
    label: string;
    type: "select" | "input";
    options?: FilterOption[];
  }[];
}

interface FilterProps<T extends { [key: string]: string }> {
  page: string;
  filters: T;
  onSetFilters: React.Dispatch<React.SetStateAction<T>>;
}

const filterConfig: FilterConfig = {
  approvals: [
    {
      key: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "Select Type Request", value: "All" },
        { label: "Change status", value: "Change status" },
        { label: "Create a store", value: "Create a store" },
        { label: "Create a category", value: "Create a category" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Select status Request", value: "All" },
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
  ],
  users: [
    {
      key: "name",
      label: "Filter by Name",
      type: "input",
    },
    {
      key: "type",
      label: "User Type",
      type: "select",
      options: [
        { label: "Select Type", value: "" },
        { label: "Employee", value: "employee" },
        { label: "Buyer", value: "buyer" },
      ],
    },
    {
      key: "active",
      label: "Active Status",
      type: "select",
      options: [
        { label: "All Users", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ],
  stores: [
    {
      key: "name",
      label: "Filter by Name",
      type: "input",
    },
    {
      key: "active",
      label: "Active Status",
      type: "select",
      options: [
        { label: "All Stores", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ],
  categories: [
    {
      key: "name",
      label: "Filter by Name",
      type: "input",
    },
    {
      key: "active",
      label: "Active Status",
      type: "select",
      options: [
        { label: "All Stores", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ],
};

export const Filter = <T extends { [key: string]: string }>({
  page,
  filters,
  onSetFilters,
}: FilterProps<T>) => {
  const handleFilterChange = (filterKey: string, value: string) => {
    onSetFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  const pageFilters = filterConfig[page] || [];

  return (
    <div className="filters">
      {pageFilters.map((filter) => (
        <div key={filter.key}>
          {filter.type === "input" ? (
            <input
              id={filter.key}
              type="text"
              name={filter.key}
              placeholder={filter.label}
              value={filters[filter.key] || ""}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            />
          ) : (
            <select
              id={filter.key}
              name={filter.key}
              value={filters[filter.key] || ""}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            >
              {filter.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};
