// client/src/services/api.ts
import axios from "axios";
import { SignUpData, LoginData } from "../Interfaces/interfaces";
import { TokenResponse, User_Response, UsersResponse } from "../types/types";

const API_BASE_URL = "http://localhost:5000/api/auth";

// Register a new user
export const register = async (data: SignUpData): Promise<User_Response> => {
  const response = await axios.post<User_Response>(
    `${API_BASE_URL}/register`,
    data
  );
  return response.data;
};

// Log in a user
export const login = async (data: LoginData): Promise<TokenResponse> => {
  const response = await axios.post<TokenResponse>(
    `${API_BASE_URL}/login`,
    data
  );
  return response.data;
};

// Fetch a user by ID
export const fetchUserById = async (id: string): Promise<User_Response> => {
  const response = await axios.get<User_Response>(
    `${API_BASE_URL}/users/${id}`
  );
  return response.data;
};

// Fetch all users
export const fetchAllUsers = async (): Promise<UsersResponse> => {
  const response = await axios.get<UsersResponse>(`${API_BASE_URL}/users`);
  return response.data;
};

// Access protected resource with a token
export const fetchProtected = async (
  token: string | null
): Promise<TokenResponse> => {
  const response = await axios.get<TokenResponse>(`${API_BASE_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to headers
    },
  });
  return response.data;
};

// // Fetch a user by ID
// export const fetchUserById = async (id: string): Promise<User | MsgRes> => {
//     try {
//       const response = await axios.get<User | MsgRes>(
//         `${API_BASE_URL}/users/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       // Type assertion to AxiosError
//       if (axios.isAxiosError(error)) {
//         return (error.response?.data ?? { message: "Unexpected error occurred" }) as MsgRes;
//       }
//       throw new Error("Unexpected error occurred while fetching user by ID");
//     }
//   };

//   // Fetch all users
//   export const fetchAllUsers = async (): Promise<User[] | MsgRes> => {
//     try {
//       const response = await axios.get<User[] | MsgRes>(`${API_BASE_URL}/users`);
//       return response.data;
//     } catch (error) {
//       // Type assertion to AxiosError
//       if (axios.isAxiosError(error)) {
//         return (error.response?.data ?? { message: "Unexpected error occurred" }) as MsgRes;
//       }
//       throw new Error("Unexpected error occurred while fetching all users");
//     }
//   };

//   // Access protected resource with a token
//   export const fetchProtected = async (token: Token): Promise<Token | MsgRes> => {
//     if (!token.token) {
//       return { message: "No token provided" }; // Graceful handling for null token
//     }

//     try {
//       const response = await axios.get<Token | MsgRes>(
//         `${API_BASE_URL}/protected`,
//         {
//           headers: {
//             Authorization: `Bearer ${token.token}`, // Attach token to headers
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       // Type assertion to AxiosError
//       if (axios.isAxiosError(error)) {
//         return (error.response?.data ?? { message: "Unexpected error occurred" }) as MsgRes;
//       }
//       throw new Error("Unexpected error occurred while accessing protected resource");
//     }
//   };
