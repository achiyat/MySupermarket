// client/src/pages/Approvals/approvals.tsx
import React, { useEffect, useState } from "react";
import "./approvals.css";
import { getAllRequests } from "../../services/api";
import { Request, Store, User } from "../../Interfaces/interfaces";
import { responses } from "./mockData";

export const Approvals: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [checkedRequests, setCheckedRequests] = useState<{
    [key: string]: string; // Tracks the state of each request ("pending", "success", "rejected")
  }>({});

  const isUser = (data: User | Store): data is User => {
    return (data as User).email !== undefined;
  };

  const isStore = (data: User | Store): data is Store => {
    return "branchName" in data;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = await getAllRequests();
      setRequests(fetchedRequests);
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  const handleCheckRequest = (requestId: string) => {
    const response = responses.find((res) => res._id === requestId);
    const request = requests.find((req) => req._id === requestId);
    console.log(request?.fromUser, request?.status, request?.message);
    if (response) {
      setCheckedRequests((prevChecked) => ({
        ...prevChecked,
        [requestId]: response.response === "success" ? "success" : "rejected",
      }));
    }
  };

  const handleApproval = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === requestId
          ? {
              ...request,
              status: "Approved",
              message: "The request was approved",
            }
          : request
      )
    );
  };

  const handleRejection = (requestId: string) => {
    const rejectionMessage =
      responses.find((res) => res._id === requestId)?.message ||
      "Request was rejected";

    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === requestId
          ? { ...request, status: "Rejected", message: rejectionMessage }
          : request
      )
    );
  };

  return (
    <div className="approvals-container">
      <h1>Request Approvals</h1>
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request._id} className="request-item">
            <div className="request-header">
              <h2>{request.type}</h2>
            </div>
            <div className="request-details">
              {isUser(request.data) ? (
                <div>
                  <p>
                    <strong>Name:</strong> {request.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {request.data.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {request.data.phone}
                  </p>
                  <p>
                    <strong>Role:</strong> {request.data.role}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {request.data.active ? "Active" : "Inactive"}
                  </p>
                </div>
              ) : isStore(request.data) ? (
                <div>
                  <p>
                    <strong>Name:</strong> {request.username}
                  </p>
                  <p>
                    <strong>Store Name:</strong> {request.data.name}
                  </p>
                  <p>
                    <strong>Branch:</strong> {request.data.branchName}
                  </p>
                  <p>
                    <strong>Address:</strong> {request.data.address}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="request-actions">
              {checkedRequests[request._id] === undefined ? (
                <button
                  className="check-btn"
                  onClick={() => handleCheckRequest(request._id)}
                >
                  Check Request
                </button>
              ) : request.message ? (
                <p className={`message ${request.status}`}>
                  {requests.find((req) => req._id === request._id)?.message}
                </p>
              ) : checkedRequests[request._id] === "success" ? (
                <button
                  className="approve-btn"
                  onClick={() => handleApproval(request._id)}
                >
                  Approve
                </button>
              ) : checkedRequests[request._id] === "rejected" ? (
                <button
                  className="reject-btn"
                  onClick={() => handleRejection(request._id)}
                >
                  Reject
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
