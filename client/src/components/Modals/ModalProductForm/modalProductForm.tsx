// client/src/components/Modals/ModalProductForm/modalProductForm.tsx
import React from "react";
import "./modalProductForm.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText: string;
}

export const ModalProductForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  buttonText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modalProduct-overlay" onClick={onClose}>
      <div
        className="modalProduct-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <button className="modalProduct-button" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
