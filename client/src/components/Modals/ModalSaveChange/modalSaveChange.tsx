import { useState } from "react";
import { User, Store, Category } from "../../../Interfaces/interfaces";
import { updateUser, updateStore, updateCategory } from "../../../services/api";
import { PageType } from "../../../types/types";
import "./modalSaveChange.css";

interface ModalSaveChangeProps<T> {
  isOpen: boolean;
  type: PageType;
  data: T;
  onConfirm: (updatedData: T) => void;
  onCancel: () => void;
}

export const ModalSaveChange = <T extends User | Store | Category>({
  isOpen,
  type,
  data,
  onConfirm,
  onCancel,
}: ModalSaveChangeProps<T>) => {
  const [message, setMessage] = useState(
    "Are you sure you want to save the changes?"
  );
  const [updatedData, setUpdatedData] = useState<T | null>(null);

  const handleConfirm = async () => {
    try {
      let response: T;

      // Narrow the type based on 'type' prop and update accordingly
      if (type === "users" && data && (data as User)._id) {
        response = (await updateUser((data as User)._id!, data as User)) as T;
      } else if (type === "stores" && data && (data as Store)._id) {
        response = (await updateStore(
          (data as Store)._id!,
          data as Store
        )) as T;
      } else if (type === "categories" && data && (data as Category)._id) {
        response = (await updateCategory(
          (data as Category)._id!,
          data as Category
        )) as T;
      } else {
        throw new Error("Unsupported type or invalid data");
      }

      if ("message" in response) {
        setMessage(response.message as string);
        setUpdatedData(response);
      } else {
        onConfirm(response); // Return the updated data to the parent
      }
    } catch (error) {
      alert("Failed to update data.");
    }
  };

  const handleErrorConfirm = () => {
    if (updatedData !== null) {
      onConfirm(updatedData); // Return the error message to the parent
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{updatedData ? "Error" : "Confirm Changes"}</h3>
        <p>{message}</p>
        <div className={updatedData ? "" : "modal-buttons"}>
          <button
            className="confirm-button"
            onClick={updatedData ? handleErrorConfirm : handleConfirm}
          >
            {updatedData ? "OK" : "Yes"}
          </button>
          {!updatedData && (
            <button className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
