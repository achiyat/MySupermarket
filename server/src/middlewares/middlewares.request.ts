import { Request } from "express";
import { Store } from "../models/Store";

// Middleware to validate requests
export const checkRequest = async (req: Request) => {
  const { fromUser, type, data } = req.body;

  console.log(req.body);
  // Handle "Change status" type requests
  if (type === "Change status") {
    const { role, active } = data || {};
    // Condition 1: Status already defined for "employee"
    if (role === "employee") {
      return {
        isValid: false,
        message: "The status you are requesting is already defined.",
        fromUser,
      };
    }

    // Condition 2: Inactive user
    if (active === false) {
      return {
        isValid: false,
        message: "Cannot process a request for an inactive user.",
        fromUser,
      };
    }
  }

  // Handle "Create a store" type requests
  if (type === "Create a store") {
    const { name, branch, address } = data || {};

    // Condition 3: Missing required store fields
    if (!name || !branch || !address) {
      return {
        isValid: false,
        message:
          "Store name, branch, and address are all required for a Create a store request.",
        fromUser,
      };
    }

    // Condition 4: Duplicate store address
    const addressExists = await Store.findOne({
      address: address,
    });
    if (addressExists) {
      return {
        isValid: false,
        message: "A store already exists under the given address.",
        fromUser,
      };
    }
  }

  // If all validations pass
  return {
    isValid: true,
    message: "The request was approved.",
    fromUser,
  };
};
