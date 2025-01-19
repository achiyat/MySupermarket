import React from "react";
import "./modalForm.css";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
