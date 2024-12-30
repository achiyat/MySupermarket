// client/src/components/Login/login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../../Interfaces/interfaces";
import "./login.css";
import { login } from "../../services/api";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="login-container">
      <img
        src="https://www.avenueanne.com/wp-content/uploads/2017/08/shopping-cart-728408_960_720.png"
        alt="Logo"
        className="login-logo"
      />
      <h2 className="login-title">Welcome Back!</h2>
      <p className="login-description">Please login to your account</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-btn primary">
          Login
        </button>
      </form>

      <p className="signup-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { Token } from "../../Interfaces/interfaces";
// import "./login.css";

// export const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       console.log(localStorage.getItem("authToken"));
//       const response = await axios.post<Token>(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       console.log(response.data);
//       localStorage.setItem("authToken", response.data.token);
//       navigate("/", { state: { token: response.data.token } });
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Welcome Back!</h2>
//       <p className="login-subtitle">Please login to your account</p>
//       <div className="form-group">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-input"
//         />
//       </div>
//       <div className="form-group">
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="form-input"
//         />
//       </div>
//       <button onClick={handleLogin} className="login-button">
//         Login
//       </button>
//       <p className="signup-text">
//         Don't have an account? <Link to="/signUp">Sign Up</Link>
//       </p>
//     </div>
//   );
// };
