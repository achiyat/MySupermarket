// client/src/components/Modals/ModalProductForm/modalProductForm.tsx
import React from "react";
import "./modalProductForm.css";
import { CreateProduct } from "../../../pages/CreateProduct/createProduct";
import { Product } from "../../../Interfaces/interfaces";
import { createProduct, updateProduct } from "../../../services/api";
import { EditProduct } from "../../EditProduct/editProduct";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  product?: Product | null;
}

export const ModalProductForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  isEditing,
  product,
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

  const handleEdit = async (_product: Product) => {
    try {
      console.log(_product);
      // await updateProduct(_product._id!, _product);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }

    onClose();
  };

  return (
    <div className="modalProduct-overlay" onClick={onClose}>
      <div
        className="modalProduct-content"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing && product ? (
          <EditProduct product={product} onEdit={handleEdit} />
        ) : (
          <CreateProduct onCreate={handleCreate} />
        )}
      </div>
    </div>
  );
};
