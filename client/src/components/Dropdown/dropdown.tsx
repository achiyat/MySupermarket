import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import { Category } from "../../Interfaces/interfaces";

interface DropdownProps {
  categories: Category[];
  onChange: (selectedCategories: Category[]) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ categories, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCategoryChange = (category: Category) => {
    const exists = selectedCategories.some((c) => c._id === category._id);
    const updatedCategories = exists
      ? selectedCategories.filter((c) => c._id !== category._id)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onChange(updatedCategories);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown-select"
        onClick={toggleDropdown}
      >
        {selectedCategories.length > 0
          ? selectedCategories.map((category) => category.name).join(", ")
          : "Select Categories"}{" "}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {categories.map(({ _id, name }) => (
            <label key={_id} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedCategories.some((c) => c._id === _id)}
                onChange={() => handleCategoryChange({ _id, name })}
              />
              {name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
