// client/src/pages/Settings/settings.tsx
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Request, User } from "../../Interfaces/interfaces";
import { createRequest, getRequestById } from "../../services/api";
import { ModalForm } from "../../components/Modals/ModalForm/modalForm";
import "./settings.css";

export const Settings: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await getRequestById(user._id!);
        if (data) setIsRequestSent(true);
        return true;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setIsRequestSent(false);
        } else {
          console.error("Error fetching requests:", error);
        }
      }
    };

    getRequests();
  }, [user._id]);

  const handleCreateStatus = async () => {
    try {
      const request: Request = {
        type: "Change status",
        status: "pending",
        fromUser: user._id!,
        username: user.username,
        data: { ...user, role: "employee" },
        created_at: new Date().toISOString(),
      };
      await createRequest(request);
      setIsRequestSent(true);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      {/* Permissions Section */}
      {user.role === "buyer" && (
        <div className="settings-section">
          <h2>Permissions</h2>
          <p>
            To become a seller and create your own store, you must create a
            status change request.
          </p>
          <button
            className={`settings-button ${isRequestSent ? "inactive" : ""}`}
            onClick={handleCreateStatus}
            disabled={isRequestSent}
          >
            {isRequestSent
              ? "Request sent"
              : "Create a request to change status"}
          </button>
          {isRequestSent && (
            <p className="settings-explanation">
              The request has been sent, please wait for the response. You can
              track the status of the request in the "Requests" area.
            </p>
          )}
        </div>
      )}

      {/* Create Store Section */}
      {user.role === "employee" && (
        <div className="settings-section">
          <h2>Create a Store</h2>
          <p>To create a store, you must send a request to create a store.</p>
          <button
            className="settings-button"
            onClick={() => setIsModalOpen(true)}
          >
            Create a request to create a store
          </button>
          <ModalForm
            user={user}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onRequestSent={() => setIsRequestSent(true)}
          />
          {isRequestSent && (
            <p className="settings-explanation">
              The request has been sent, please wait for the response. You can
              track the status of the request in the "Requests" area.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
