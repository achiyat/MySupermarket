// client/src/pages/Settings/settings.tsx
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Request, User } from "../../Interfaces/interfaces";
import { createRequest, getRequestsByUserId } from "../../services/api";
import { ModalForm } from "../../components/Modals/ModalForm/modalForm";
import "./settings.css";

export const Settings: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"store" | "category" | null>(null);
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const requests: Request[] = await getRequestsByUserId(user._id!);
        if (!requests.length) return;
        setIsRequestSent(true);
        setIsRejected(requests.some((req) => req.status === "rejected"));
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    if (user.role === "buyer") {
      getRequests();
    }
  }, [user._id]);

  const handleRequest = async () => {
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

  const openModal = (type: "store" | "category") => {
    setModalType(type);
    setIsModalOpen(true);
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
            onClick={handleRequest}
            disabled={isRequestSent}
          >
            {isRequestSent
              ? "Request sent"
              : "Create a request to change status"}
          </button>
          {isRequestSent && (
            <p
              className={`settings-explanation ${isRejected ? "rejected" : ""}`}
            >
              {isRejected
                ? "Your request was rejected."
                : "The request has been sent, please wait for the response."}
            </p>
          )}
        </div>
      )}

      {/* Create Store and Create Category Section */}
      {user.role === "employee" && (
        <>
          {["store", "category"].map((type) => (
            <div className="settings-section" key={type}>
              <h2>
                {type === "store" ? "Create a Store" : "Create a Category"}
              </h2>
              <p>
                {type === "store"
                  ? "To create a store, you must send a request."
                  : "To create a category, fill out the form to send a request."}
              </p>
              <button
                className="settings-button"
                onClick={() => openModal(type as "store" | "category")}
              >
                {type === "store"
                  ? "Create a request to create a store"
                  : "Create a Category Request"}
              </button>
            </div>
          ))}
          <ModalForm
            user={{ id: user._id!, username: user.username }}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onSent={() => setIsRequestSent(true)}
            isCategory={modalType === "category"}
          />
          {isRequestSent && (
            <p className="settings-explanation">
              The request has been sent, please wait for the response. You can
              track the status in the "Requests" area.
            </p>
          )}
        </>
      )}
    </div>
  );
};
