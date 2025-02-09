// client/src/components/Modals/ModalProductForm/modalProductForm.tsx
import React from "react";
import "./modalProductForm.css";
import { CreateProduct } from "../../../pages/CreateProduct/createProduct";
import { Product } from "../../../Interfaces/interfaces";
import { createProduct } from "../../../services/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: { title: string; button: string };
}

export const ModalProductForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  if (!isOpen) return null;

  const handleCreate = async (product: Product) => {
    try {
      // await createProduct(product);
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
        {content.button === "Create" ? (
          <CreateProduct onCreate={handleCreate} />
        ) : (
          <button className="modalProduct-button" onClick={onClose}>
            {content.button}
          </button>
        )}
      </div>
    </div>
  );
};
