// client/src/components/Modals/ModalProductForm/modalProductForm.tsx
import React from "react";
import "./modalProductForm.css";

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

  return (
    <div className="modalProduct-overlay" onClick={onClose}>
      <div
        className="modalProduct-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{content.title}</h2>
        <button className="modalProduct-button" onClick={onClose}>
          {content.button}
        </button>
      </div>
    </div>
  );
};
