// client/src/components/Modals/ModalForm/modalForm.tsx
import React from "react";
import { createRequest } from "../../../services/api";
import { User } from "../../../Interfaces/interfaces";
import "./modalForm.css";

interface ModalFormProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  user,
  isOpen,
  setIsOpen,
}) => {
  const [formData, setFormData] = React.useState({
    name: "",
    branch: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      requestType: "Create a store",
      requestDate: new Date().toISOString(),
      status: "Pending",
      data: { ...formData, employeeId: user._id },
    };

    try {
      await createRequest(requestData);
      setFormData({ name: "", branch: "", address: "" });
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating store request:", error);
    }
  };

  const isFormEmpty = !formData.name || !formData.branch || !formData.address;

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
                  name="branch"
                  value={formData.branch}
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
