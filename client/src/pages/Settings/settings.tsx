import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User } from "../../Interfaces/interfaces";
import { createRequest } from "../../services/api";
import { ModalForm } from "../../components/Modals/ModalForm/modalForm";
import "./settings.css";

export const Settings: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateStatus = async () => {
    const requestData = {
      requestType: "Change status",
      requestDate: new Date().toISOString(),
      status: "Pending",
      data: {
        user: {
          ...user,
          role: "employee",
        },
      },
    };

    try {
      await createRequest(requestData);
      setIsRequestSent(true);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <div className="permissions-section">
        <h2>Permissions</h2>
        <p>
          To become a seller and create your own store, you must create a status
          change request.
        </p>
        {isRequestSent ? (
          <button className="create-request-button inactive" disabled>
            Request sent
          </button>
        ) : (
          <button
            className="create-request-button"
            onClick={handleCreateStatus}
          >
            Create a request to change status
          </button>
        )}
        {isRequestSent && (
          <p className="request-explanation">
            The request has been sent, please wait for the response. You can
            track the status of the request in the "Requests" area.
          </p>
        )}
      </div>

      <div className="create-store-section">
        <h2>Create a Store</h2>
        <p>To create a store, you must send a request to create a store.</p>
        <button
          className="create-request-button"
          onClick={() => setIsModalOpen(true)}
        >
          Create a request to create a store
        </button>
        <ModalForm
          user={user}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};
