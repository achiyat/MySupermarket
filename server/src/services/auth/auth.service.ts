// src/services/auth/auth.service.ts
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../constants";
import { User } from "../../models/User";

// Verify the JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET); // Decode and verify token
  } catch (error) {
    throw new Error("Invalid token");
  }
};

class AuthService {
  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    return jwt.sign({ id: user._id }, JWT_SECRET!, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
}

export default new AuthService();
