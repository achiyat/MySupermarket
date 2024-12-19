// // src/App.tsx
// import React from "react";
// import "./App.css";

// const App: React.FC = () => {
//   return <div className="app">supermarket</div>;
// };

// export default App;

// src/App.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { Welcome } from "./components/Welcome/welcome";
import { Login } from "./components/Login/login";

const App: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading authentication...</div>;
  }

  return <div className="app">{isAuthenticated ? <Welcome /> : <Login />}</div>;
};

export default App;
