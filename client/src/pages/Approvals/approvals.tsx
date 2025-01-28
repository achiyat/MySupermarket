import React, { useEffect, useState } from "react";
import "./approvals.css";
import {
  checkRequest,
  createCategory,
  createStore,
  getAllRequests,
  updateRequest,
  updateUser,
} from "../../services/api";
import { Request } from "../../Interfaces/interfaces";
import { Status } from "../../types/types";
import {
  CategoryDetails,
  isCategory,
  isStore,
  isUser,
  storeDetails,
  userDetails,
} from "../../dictionaries/requestDetails";

export const Approvals: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [checkedRequests, setCheckedRequests] = useState<{
    [key: string]: {
      response: Status;
      message: string;
    };
  }>({});
  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
  });

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAllRequests();
      setRequests(data);
    };

    fetchRequests();
  }, []);

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

  const handleRequest = async (id: string) => {
    const request = requests.find((req) => req._id === id);
    if (!request) return;

    const { response, message } = checkedRequests[request._id!] || {};
    try {
      if (response === "approved") {
        if (isUser(request.data)) {
          await updateUser(request.fromUser, request.data);
        } else if (isStore(request.data)) {
          await createStore(request.data);
        } else if (isCategory(request.data)) {
          await createCategory(request.data);
        }
      }

      const updatedRequestData: Request = {
        ...request,
        status: response,
        message,
        active: false,
      };

      await updateRequest(updatedRequestData._id!, updatedRequestData);

      // Update the state after performing actions
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id
            ? { ...req, status: response, message, active: false }
            : req
        )
      );
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  const filteredRequests = requests.filter((request) => {
    const { type, status } = filters;
    const isTypeFilter = type === "All" || request.type === type;
    const isStatusFilter = status === "All" || request.status === status;
    return isTypeFilter && isStatusFilter;
  });

  return (
    <div className="approvals-container">
      <h1 className="approvals-h1">Request Approvals</h1>

      {/* Filters */}
      <div className="approvals-filters">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        >
          <option value="All">All</option>
          <option value="Change status">Change status</option>
          <option value="Create a store">Create a store</option>
          <option value="Create a category">Create a category</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="approvals-list">
        {filteredRequests.map((request) => {
          const details =
            userDetails(request) ||
            storeDetails(request) ||
            CategoryDetails(request) ||
            [];
          const response = checkedRequests[request._id!]?.response;

          const buttonProps = response
            ? response === "approved"
              ? {
                  className: "approve-btn",
                  label: "Approve",
                  onClick: () => handleRequest(request._id!),
                }
              : {
                  className: "reject-btn",
                  label: "Reject",
                  onClick: () => handleRequest(request._id!),
                }
            : {
                className: "approvals-check",
                label: "Check Request",
                onClick: () => handleCheckRequest(request),
              };

          return (
            <div key={request._id} className="approvals-item">
              <div className="approvals-header">
                <h2>{request.type}</h2>
              </div>
              <div className="approvals-details">
                <div>
                  {details.map((field, index) => (
                    <p key={index}>
                      <strong>{field.label}:</strong> {field.value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="approvals-actions">
                {request.message ? (
                  <p className={`approvals-message ${request.status}`}>
                    {request.message}
                  </p>
                ) : (
                  <button
                    className={buttonProps.className}
                    onClick={buttonProps.onClick}
                  >
                    {buttonProps.label}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
