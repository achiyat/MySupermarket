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

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMessages({}); // Clear previous errors

    try {
      const result = await register(formData);
      console.log(result);
      if ("message" in result) {
        if (result.message.username || result.message.email) {
          setErrorMessages(result.message);
        }
      } else {
        console.log(result);
        handleLogin();
      }
    } catch (error) {
      setErrorMessages({
        error: "Internal Server Error, please try again later.",
      });
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
          <div key={field.value}>
            <input
              type={field.type}
              placeholder={field.placeholder}
              name={field.value as string}
              value={String(formData[field.value])}
              onChange={handleChange}
              className="signUp-input"
              required
            />
            {errorMessages[field.value as string] && (
              <div className="error-message">
                {errorMessages[field.value as string]}
              </div>
            )}
          </div>
        ))}

        {errorMessages.error && (
          <div className="error-message">{errorMessages.error}</div>
        )}

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
