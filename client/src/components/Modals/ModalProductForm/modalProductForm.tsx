// client/src/components/Modals/ModalProductForm/modalProductForm.tsx
import React from "react";
import "./modalProductForm.css";
import { CreateProduct } from "../../../pages/CreateProduct/createProduct";
import { Product } from "../../../Interfaces/interfaces";
import { createProduct } from "../../../services/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
}

export const ModalProductForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  isEditing,
}) => {
  if (!isOpen) return null;

  const handleCreate = async (product: Product) => {
    try {
      await createProduct(product);
      console.log(product);
      console.log("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }

    onClose();
  };

  return (
    <div className="modalProduct-overlay" onClick={onClose}>
      <div
        className="modalProduct-content"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <button className="modalProduct-button" onClick={onClose}>
            Edit
          </button>
        ) : (
          <CreateProduct onCreate={handleCreate} />
        )}
      </div>
    </div>
  );
};
