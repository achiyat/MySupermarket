// client/src/pages/Settings/settings.tsx
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User } from "../../Interfaces/interfaces";
import { createRequest } from "../../services/api";
import "./settings.css";

export const Settings: React.FC = () => {
  const { user } = useOutletContext<{ user: User }>();
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleCreateRequest = async () => {
    // Create the request object
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

    // Call the service function to create the request on the server
    try {
      await createRequest(requestData);
      setIsRequestSent(true); // Update button and process explanation
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
          To become a seller and create your own store, please submit a request
          to change your status.
        </p>

        {!isRequestSent ? (
          <button
            className="create-request-button"
            onClick={handleCreateRequest}
          >
            Create a request to change status
          </button>
        ) : (
          <button className="request-sent-button" disabled>
            Request sent
          </button>
        )}

        {isRequestSent && (
          <p className="request-explanation">
            The request has been sent. Please wait for the response. You can
            track the status of the request in the "Requests" area.
          </p>
        )}
      </div>
    </div>
  );
};
