// client/src/components/SignUp/signUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../services/api";
import { SignUpData, LoginData } from "../../Interfaces/interfaces";
import "./signUp.css";
import { Role } from "../../types/types";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState<Role>("Customer");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const signUpData: SignUpData = {
      username,
      email,
      password,
      role,
    };

    try {
      const result = await register(signUpData);
      if ("message" in result) {
        console.error(result.message);
      } else {
        console.log(result);
        handleLogin();
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async () => {
    const loginData: LoginData = { email, password };

    try {
      const result = await login(loginData);
      if ("message" in result) {
        console.error(result.message);
      } else {
        localStorage.setItem("authToken", result.token);
        navigate("/", { state: { token: result.token } });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const clickLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signUp-container">
      <img
        src="https://www.avenueanne.com/wp-content/uploads/2017/08/shopping-cart-728408_960_720.png"
        alt="Logo"
        className="signUp-logo"
      />
      <h2 className="signUp-title">Sign Up</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signUp-input"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signUp-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signUp-input"
          required
        />

        <div className="signUp-buttons">
          <button type="submit" className="signUp-btn primary">
            Sign Up
          </button>
          <button
            type="button"
            className="signUp-btn secondary"
            onClick={clickLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

{
  /* <select
value={role}
onChange={(e) => setRole(e.target.value as Role)}
className="signUp-input"
required
>
<option value="Customer">Customer</option>
<option value="Employee">Employee</option>
<option value="Administrator">Administrator</option>
</select> */
}
