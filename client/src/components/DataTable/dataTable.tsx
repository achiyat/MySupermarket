// client/src/components/DataTable/dataTable.tsx
import { ChangeEvent, useState } from "react";
import "./dataTable.css";
import { headerMapping } from "../../dictionaries/headerMapping";
import { useNavigate } from "react-router-dom";
import { PageType } from "../../types/types";

interface DataTableProps<T> {
  pageType: PageType;
  data: T[];
}

export const DataTable = <T,>({ pageType, data }: DataTableProps<T>) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    active: "all",
  });

  const handleTextSelectChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredData = data.filter((item) => {
    // Ensure the 'name' property exists before applying the filter
    const itemName = (item as any).name || (item as any).username;
    const filterByName =
      itemName && itemName.toLowerCase().includes(filters.name.toLowerCase());

    // Filter by "type" (only for users page)
    const filterByType =
      pageType === "users" && filters.type
        ? (item as any).role === filters.type
        : true;

    // Filter by "active" status
    const filterByActive =
      filters.active === "all" ||
      (filters.active === "active" && (item as any).active) ||
      (filters.active === "inactive" && !(item as any).active);

    return filterByName && filterByType && filterByActive;
  });

  const handleShowDetails = (item: any) => {
    const name = item.username || item.name;
    console.log(`/${pageType}/${name}`);
    navigate(`/${pageType}/${name}`, { state: { item } });
  };

  const renderTableHeaders = () => {
    return Object.keys(headerMapping[pageType]).map((key) => (
      <th key={key}>{headerMapping[pageType][key]}</th>
    ));
  };

  const renderTableRows = () => {
    return filteredData.map((item, index) => (
      <tr key={index}>
        {Object.keys(headerMapping[pageType]).map((key) => {
          let value = (item as any)[key];
          let cellClass = "";

          if (key === "active") {
            cellClass = value ? "active-cell" : "inactive-cell";
            value = value ? "V" : "X";
          }

          if (key === "productCount" && (item as any).products) {
            value = (item as any).products.length;
          }

          if (key === "showDetails") {
            cellClass = "show-details-cell";
            value = (
              <button
                onClick={() => handleShowDetails(item)}
                className="show-details-btn"
              >
                Show Details
              </button>
            );
          }

          return (
            <td key={key} className={cellClass}>
              {value}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="dynamic-page">
      <header className="dynamic-page-header">
        <div className="page-title">{String(pageType).toUpperCase()}</div>
        <button className="add-new-btn">Add New</button>
      </header>
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleTextSelectChange}
          className="filter-input"
        />
        {pageType === "users" && (
          <select
            name="type"
            value={filters.type}
            onChange={handleTextSelectChange}
            className="filter-select"
          >
            <option value="">Select Type</option>
            <option value="employee">Employee</option>
            <option value="buyer">Buyer</option>
          </select>
        )}
        <select
          name="active"
          value={filters.active}
          onChange={handleTextSelectChange}
          className="filter-select"
        >
          <option value="all">{`All ${String(pageType)}`}</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="data-table">
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};
