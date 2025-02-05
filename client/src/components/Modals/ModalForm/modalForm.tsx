// client/src/components/Modals/ModalForm/modalForm.tsx
import React from "react";
import { createRequest } from "../../../services/api";
import { Request } from "../../../Interfaces/interfaces";
import "./modalForm.css";
import { fieldConfig } from "../../../dictionaries/fieldConfig";

interface ModalFormProps {
  user: {
    id: string;
    username: string;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSent?: () => void;
  onUpdated?: (updatedRequest: Request) => void;
  isCategory?: boolean;
  initialData?: {
    name: string;
    branch: string;
    address: string;
  };
}

export const ModalForm: React.FC<ModalFormProps> = ({
  user,
  isOpen,
  setIsOpen,
  onSent,
  onUpdated,
  isCategory = false,
  initialData = { name: "", branch: "", address: "" },
}) => {
  const [formData, setFormData] = React.useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request: Request = {
      type: isCategory ? "Create a category" : "Create a store",
      status: "pending",
      fromUser: user.id!,
      username: user.username,
      data: isCategory
        ? { name: formData.name, products: [] }
        : { ...formData, employeeId: user.id! },
      created_at: new Date().toISOString(),
    };

    try {
      if (onUpdated) {
        onUpdated(request);
      } else if (onSent) {
        await createRequest(request);
        onSent();
      }
      setFormData({ name: "", branch: "", address: "" });
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving request:", error);
    }
  };

  const isFormEmpty = (): boolean => {
    return isCategory
      ? !formData.name
      : !formData.name || !formData.branch || !formData.address;
  };

  return (
    isOpen && (
      <div className="modalForm-overlay">
        <div className="modalForm-container">
          <button className="modalForm-close" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <div className="modalForm-content">
            <h3 className="modalForm-title">
              {isCategory ? "Create a Category" : "Create a Store"}
            </h3>
            <form onSubmit={handleSubmit}>
              {fieldConfig[isCategory ? "Categories" : "Stores"].map(
                (field) => (
                  <label
                    key={field.value as string}
                    className="modalForm-label"
                  >
                    {field.label}:
                    <input
                      className="modalForm-input"
                      type={field.type}
                      name={field.value as string}
                      value={formData[field.value as keyof typeof formData]}
                      onChange={handleChange}
                      required
                    />
                  </label>
                )
              )}
              <button
                className="modalForm-button"
                type="submit"
                disabled={isFormEmpty()}
              >
                {isCategory ? "Create Category" : "Create Store"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
