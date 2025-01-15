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
  const handleConfirm = async () => {
    try {
      let updatedData: T;

      // Narrow the type based on 'type' prop and update accordingly
      if (type === "users" && data && (data as User)._id) {
        updatedData = (await updateUser(
          (data as User)._id!,
          data as User
        )) as T;
      } else if (type === "stores" && data && (data as Store)._id) {
        updatedData = (await updateStore(
          (data as Store)._id!,
          data as Store
        )) as T;
      } else if (type === "categories" && data && (data as Category)._id) {
        updatedData = (await updateCategory(
          (data as Category)._id!,
          data as Category
        )) as T;
      } else {
        throw new Error("Unsupported type or invalid data");
      }

      onConfirm(updatedData); // Return the updated data to the parent
    } catch (error) {
      alert("Failed to update data.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Changes</h3>
        <p>Are you sure you want to save the changes?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleConfirm}>
            Yes
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
