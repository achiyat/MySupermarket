// client/src/App.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import { Login } from "./components/Login/login";
import { Dashboard } from "./components/Dashboard/dashboard";

const App: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading authentication...</div>;
  }

  return (
    <div className="app">{isAuthenticated ? <Dashboard /> : <Login />}</div>
  );
};

export default App;
