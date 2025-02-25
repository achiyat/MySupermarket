// client/src/components/Modals/ModalProductForm/modalProductForm.tsx
import React from "react";
import "./modalProductForm.css";
import { Product } from "../../../Interfaces/interfaces";
import { createProduct, updateProduct } from "../../../services/api";
import { ProductForm } from "../../ProductForm/productForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  product?: Product | null;
  onUpdate: (updatedProduct: Product) => void;
}

export const ModalProductForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  isEditing,
  product,
  onUpdate,
}) => {
  if (!isOpen) return null;

  const isEditingProduct = isEditing && product;

  const handleCreate = async (product: Product) => {
    try {
      console.log(product);
      const response = await createProduct(product);
      onUpdate(response);
      console.log("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }

    onClose();
  };

  const handleEdit = async (_product: Product) => {
    try {
      console.log(_product);
      const response = await updateProduct(_product._id!, _product);
      onUpdate(response);
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
        {isEditingProduct ? (
          <ProductForm initialData={product} onSubmit={handleEdit} />
        ) : (
          <ProductForm onSubmit={handleCreate} />
        )}
      </div>
    </div>
  );
};
