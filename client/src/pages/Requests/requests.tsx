// client/src/pages/Requests/requests.tsx
import React, { useEffect, useState } from "react";
import { Request, User } from "../../Interfaces/interfaces";
import { getAllRequests, updateRequest } from "../../services/api";
import { ModalForm } from "../../components/Modals/ModalForm/modalForm";
import { isStore } from "../../dictionaries/requestDetails";
import "./requests.css";
import { useOutletContext } from "react-router-dom";

export const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  // Remove later
  const { user } = useOutletContext<{ user: User }>();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const allRequests = await getAllRequests();
        // Remove later
        const userRequests = allRequests.filter(
          (req) => req.fromUser === user._id
        );
        console.log(userRequests);
        setRequests(userRequests);
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
        created_at: selectedRequest?.created_at || updatedRequest.created_at,
        message: "",
        active: true,
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
            branch: selectedRequest.data.branch,
            address: selectedRequest.data.address,
          }}
        />
      )}
    </div>
  );
};
