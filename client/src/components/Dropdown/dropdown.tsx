import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";

interface Category {
  id: string;
  name: string;
}

interface DropdownProps {
  categories: Category[];
  onChange: (selectedCategoryIds: string[]) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ categories, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategoryIds = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];

    setSelectedCategoryIds(updatedCategoryIds);
    onChange(updatedCategoryIds);
  };

  // Close dropdown if clicking outside
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
        {selectedCategoryIds.length > 0
          ? categories
              .filter((category) => selectedCategoryIds.includes(category.id))
              .map((category) => category.name)
              .join(", ")
          : "Select Categories"}{" "}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {categories.map(({ id, name }) => (
            <label key={id} className="dropdown-item">
              <input
                type="checkbox"
                value={id}
                checked={selectedCategoryIds.includes(id)}
                onChange={() => handleCategoryChange(id)}
              />
              {name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
