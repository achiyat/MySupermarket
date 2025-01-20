import React, { useEffect, useState } from "react";
import { Request } from "../../Interfaces/interfaces";
import { getAllRequests } from "../../services/api";
import "./requests.css";

export const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await getAllRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error creating store request:", error);
      }
    };

    getRequests();
  }, []);

  if (!requests) return <p>no requests</p>;

  return (
    <div className="requests-container">
      <h1 className="requests-title">Your Requests</h1>
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request._id} className="request-item">
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
          </div>
        ))}
      </div>
    </div>
  );
};
