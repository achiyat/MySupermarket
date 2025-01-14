// client/src/components/SignUp/signUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../services/api";
import "./signUp.css";
import { Role } from "../../types/types";
import { LoginData, User } from "../../Interfaces/interfaces";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role] = useState<Role>("buyer");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const userData: User = {
      username,
      email,
      password,
      role,
      phone,
      address,
    };

    try {
      const result = await register(userData);
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

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="signUp-input"
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

// // client/src/components/SignUp/signUp.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { register, login } from "../../services/api";
// import "./signUp.css";
// import { Role } from "../../types/types";

// export const SignUp: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role] = useState<Role>("buyer");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const signUpData: User = {
//       username,
//       email,
//       password,
//       role,
//     };

//     try {
//       const result = await register(signUpData);
//       if ("message" in result) {
//         console.error(result.message);
//       } else {
//         console.log(result);
//         handleLogin();
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   const handleLogin = async () => {
//     const loginData: LoginData = { email, password };

//     try {
//       const result = await login(loginData);
//       if ("message" in result) {
//         console.error(result.message);
//       } else {
//         localStorage.setItem("authToken", result.token);
//         navigate("/", { state: { token: result.token } });
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const clickLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="signUp-container">
//       <img
//         src="https://www.avenueanne.com/wp-content/uploads/2017/08/shopping-cart-728408_960_720.png"
//         alt="Logo"
//         className="signUp-logo"
//       />
//       <h2 className="signUp-title">Sign Up</h2>

//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="signUp-input"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="signUp-input"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="signUp-input"
//           required
//         />

//         <div className="signUp-buttons">
//           <button type="submit" className="signUp-btn primary">
//             Sign Up
//           </button>
//           <button
//             type="button"
//             className="signUp-btn secondary"
//             onClick={clickLogin}
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
