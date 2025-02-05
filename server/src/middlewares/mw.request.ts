import { Request } from "express";
import { Store } from "../models/Store";
import { User } from "../models/User";
import { Category } from "../models/Category";

// Middleware to validate requests
export const checkRequest = async (req: Request) => {
  const { _id, fromUser, type, data } = req.body;
  // Handle "Change status" type requests
  if (type === "Change status") {
    const user = await User.findOne({ _id: fromUser });
    const { role, active } = user || {};
    // Condition 1: Status already defined for "employee"
    if (role === "employee") {
      return {
        isValid: false,
        message: "The status you are requesting is already defined.",
        _id,
      };
    }

    // Condition 2: Inactive user
    if (active === false) {
      return {
        isValid: false,
        message: "Cannot process a request for an inactive user.",
        _id,
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
        _id,
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
        _id,
      };
    }
  }

  // Handle "Create a category" type requests
  if (type === "Create a category") {
    const { name } = data || {};

    // Condition 5: Missing category name
    if (!name) {
      return {
        isValid: false,
        message: "Category name is required for a Create a category request.",
        _id,
      };
    }

    // Condition 6: Duplicate category name
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      return {
        isValid: false,
        message: "A category with this name already exists.",
        _id,
      };
    }
  }

  // If all validations pass
  return {
    isValid: true,
    message: "The request was approved.",
    _id,
  };
};
