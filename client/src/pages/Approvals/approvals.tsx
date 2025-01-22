// client/src/pages/Approvals/approvals.tsx
import React, { useEffect, useState } from "react";
import "./approvals.css";
import { checkRequest, getAllRequests } from "../../services/api";
import { Request, Store, User } from "../../Interfaces/interfaces";
import { Status } from "../../types/types";

export const Approvals: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [checkedRequests, setCheckedRequests] = useState<{
    [key: string]: {
      response: Status;
      message: string;
    };
  }>({});

  const isUser = (data: User | Store): data is User => {
    return (data as User).email !== undefined;
  };

  const isStore = (data: User | Store): data is Store => {
    return "branchName" in data;
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAllRequests();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  const handleCheckRequest = async (_request: Request) => {
    const response = await checkRequest(_request);

    if (response) {
      setCheckedRequests((prevChecked) => ({
        ...prevChecked,
        [response._id]: {
          response: response.response === "approved" ? "approved" : "rejected",
          message: response.message,
        },
      }));
    }
  };

  const handleRequest = (requestId: string) => {
    const updatedRequests = requests.map((request) =>
      request.fromUser === requestId
        ? {
            ...request,
            status: checkedRequests[requestId]?.response,
            message: checkedRequests[requestId]?.message,
          }
        : request
    );

    setRequests(updatedRequests);
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
              {request.message ? (
                <p className={`message ${request.status}`}>{request.message}</p>
              ) : checkedRequests[request.fromUser!]?.response ===
                "approved" ? (
                <button
                  className="approve-btn"
                  onClick={() => handleRequest(request.fromUser!)}
                >
                  Approve
                </button>
              ) : checkedRequests[request.fromUser!]?.response ===
                "rejected" ? (
                <button
                  className="reject-btn"
                  onClick={() => handleRequest(request.fromUser!)}
                >
                  Reject
                </button>
              ) : (
                <button
                  className="check-btn"
                  onClick={() => handleCheckRequest(request)}
                >
                  Check Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
