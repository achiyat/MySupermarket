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
  const [modalType, setModalType] = useState<"store" | "category" | null>(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await getRequestById(user._id!);
        if (data) setIsRequestSent(true);
        return true;
      } catch (error: any) {
        setIsRequestSent(false);
        console.error("Error fetching requests:", error);
      }
    };

    getRequests();
  }, [user._id]);

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
            onClick={async () => {
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
            }}
            disabled={isRequestSent}
          >
            {isRequestSent
              ? "Request sent"
              : "Create a request to change status"}
          </button>
          <p className="settings-explanation">
            The request has been sent, please wait for the response. You can
            track the status of the request in the "Requests" area.
          </p>
        </div>
      )}

      {/* Create Store and Create Category Section */}
      {user.role === "employee" && (
        <>
          {(["store", "category"] as const).map((type) => {
            const isStore = type === "store";

            return (
              <div className="settings-section" key={type}>
                <h2>{isStore ? "Create a Store" : "Create a Category"}</h2>
                <p>
                  {isStore
                    ? "To create a store, you must send a request to create a store."
                    : "To create a category, fill out the form to send a request."}
                </p>
                <button
                  className="settings-button"
                  onClick={() => {
                    setModalType(type);
                    setIsModalOpen(true);
                  }}
                >
                  {isStore
                    ? "Create a request to create a store"
                    : "Create a Category Request"}
                </button>
              </div>
            );
          })}

          <ModalForm
            user={{ id: user._id!, username: user.username }}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onSent={() => setIsRequestSent(true)}
            isCategory={modalType === "category"}
          />

          <p className="settings-explanation">
            The request has been sent, please wait for the response. You can
            track the status of the request in the "Requests" area.
          </p>
        </>
      )}
    </div>
  );
};
