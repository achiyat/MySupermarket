// client/src/components/SignUp/signUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../services/api";
import "./signUp.css";
import { LoginData, User } from "../../Interfaces/interfaces";
import { fieldConfig } from "../../dictionaries/fieldConfig";

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "buyer",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const result = await register(formData);
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
    const loginData: LoginData = {
      email: formData.email,
      password: formData.password!,
    };

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
        {fieldConfig.Users.map((field) => (
          <input
            key={field.value}
            type={field.type}
            placeholder={field.placeholder}
            name={field.value as string}
            value={String(formData[field.value])}
            onChange={handleChange}
            className="signUp-input"
            required
          />
        ))}

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
