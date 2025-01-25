// client/src/components/Modals/ModalForm/modalForm.tsx
import React from "react";
import { createRequest } from "../../../services/api";
import { Request } from "../../../Interfaces/interfaces";
import "./modalForm.css";

interface ModalFormProps {
  user: {
    id: string;
    username: string;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSent?: () => void;
  onUpdated?: (updatedRequest: Request) => void;
  initialData?: {
    name: string;
    branchName: string;
    address: string;
  };
}

export const ModalForm: React.FC<ModalFormProps> = ({
  user,
  isOpen,
  setIsOpen,
  onSent,
  onUpdated,
  initialData = { name: "", branchName: "", address: "" },
}) => {
  const [formData, setFormData] = React.useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const request: Request = {
      type: "Create a store",
      status: "pending",
      fromUser: user.id!,
      username: user.username,
      data: { ...formData, employeeId: user.id! },
      created_at: new Date().toISOString(),
    };

    try {
      if (onUpdated) {
        onUpdated(request);
      } else if (onSent) {
        await createRequest(request);
        onSent();
      }
      setFormData({ name: "", branchName: "", address: "" });
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving request:", error);
    }
  };

  const isFormEmpty =
    !formData.name || !formData.branchName || !formData.address;

  return (
    isOpen && (
      <div className="modalForm-overlay">
        <div className="modalForm-container">
          <button className="modalForm-close" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <div className="modalForm-content">
            <h3 className="modalForm-title">Create a Store</h3>
            <form onSubmit={handleSubmit}>
              <label className="modalForm-label">
                Store Name:
                <input
                  className="modalForm-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="modalForm-label">
                Branch:
                <input
                  className="modalForm-input"
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="modalForm-label">
                Address:
                <input
                  className="modalForm-input"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </label>
              <button
                className="modalForm-button"
                type="submit"
                disabled={isFormEmpty}
              >
                Create Store
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
