// server/src/middleware/user.middlewares.ts
import { Request, Response, NextFunction } from "express";

export const respond = (
  res: Response,
  statusCode: number,
  message: string
): void => {
  // res.status(statusCode).json(new Error(message));
  res.status(statusCode).json({ message });
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    username,
    email,
    password,
    role,
    adminFields,
    employeeFields,
    buyerFields,
  } = req.body;

  console.log(username);
  console.log(employeeFields);

  if (!username || !email || !password || !role) {
    respond(res, 400, "All fields are required");
    return;
  }

  if (password.length > 6) {
    respond(res, 400, "Password must be up to 6 characters long.");
    return;
  }

  if (role === "admin") {
    if (
      !adminFields ||
      !Array.isArray(adminFields.users) ||
      !Array.isArray(adminFields.categories)
    ) {
      respond(res, 400, "'users' and 'categories' must be arrays for admin.");
      return;
    }
  } else if (role === "employee") {
    if (employeeFields && !Array.isArray(employeeFields.stores)) {
      respond(res, 400, "'stores' must be an array for employee.");
      return;
    }
  } else if (role === "buyer") {
    if (!buyerFields || !buyerFields.address || !buyerFields.phone) {
      respond(res, 400, "Buyer must have 'address' and 'phone' fields.");
      return;
    }
  } else {
    respond(
      res,
      400,
      "Invalid role. Role must be 'admin', 'employee', or 'buyer'."
    );
    return;
  }

  next();
};
