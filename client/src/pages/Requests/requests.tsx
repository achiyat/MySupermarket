// client/src/pages/Requests/requests.tsx
import React, { useEffect, useState } from "react";
import { Request } from "../../Interfaces/interfaces";
import { getAllRequests, updateRequest } from "../../services/api";
import { ModalForm } from "../../components/Modals/ModalForm/modalForm";
import { isStore } from "../../dictionaries/requestDetails";
import "./requests.css";

export const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await getAllRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    getRequests();
  }, []);

  const handleEditClick = (requestId: string) => {
    const request = requests.find((req) => req._id === requestId);

    if (request && isStore(request.data)) {
      setSelectedRequest(request);
      setIsModalOpen(true);
    }
  };

  const handleRequestUpdated = async (updatedRequest: Request) => {
    try {
      const requestWithId = {
        ...updatedRequest,
        _id: selectedRequest?._id,
        message: "",
      };
      const response = await updateRequest(requestWithId._id!, requestWithId);
      const _requests = requests.map((req) =>
        req._id === response._id ? response : req
      );
      setRequests(_requests);
      setIsModalOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  if (!requests) return <p>No requests</p>;

  return (
    <div className="requests-container">
      <h1 className="requests-title">Your Requests</h1>
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request?._id} className="request-item">
            <h3 className="request-type">{request.type}</h3>
            <p className="request-name">
              {"name" in request.data
                ? request.data.name
                : request.data.username}
            </p>
            <p className="request-created-at">
              Created At: {new Date(request.created_at).toLocaleString()}
            </p>
            <p className={`request-status ${request.status.toLowerCase()}`}>
              Status: {request.status}
            </p>
            {request.message && (
              <p className={`request-message ${request.status.toLowerCase()}`}>
                {request.message}
              </p>
            )}
            {request.status.toLowerCase() === "rejected" && (
              <button
                className="request-edit"
                onClick={() => handleEditClick(request._id!)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && selectedRequest && isStore(selectedRequest.data) && (
        <ModalForm
          user={{
            id: selectedRequest.fromUser,
            username: selectedRequest.username,
          }}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onUpdated={handleRequestUpdated}
          initialData={{
            name: selectedRequest.data.name,
            branchName: selectedRequest.data.branchName,
            address: selectedRequest.data.address,
          }}
        />
      )}
    </div>
  );
};
