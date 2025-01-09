// client/src/types/types.ts
import { MsgRes, SignUpData, Token, User } from "../Interfaces/interfaces";
export type Role = "administrator" | "employee" | "buyer";
export type User_Response = User | MsgRes;
export type UsersResponse = User[] | MsgRes;
export type TokenResponse = Token | MsgRes;

export const DefaultFormData: SignUpData = {
  username: "",
  email: "",
  password: "",
  role: "buyer",
};
