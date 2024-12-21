// client/src/components/Dashboard/dashboard.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { users } from "../../dictionaries/users";
import { RouterComponent } from "../RouterComponent/routerComponent";
import { Navbar } from "../Navbar/navbar";
import { Footer } from "../Footer/footer";
import "./dashboard.css";

export const Dashboard: React.FC = () => {
  const { user } = useAuth0();

  if (!user?.sub || !users[user.sub]) {
    return <div>User not recognized</div>;
  }

  const role = users[user.sub].role;

  return (
    <div className="dashboard-layout">
      <Navbar role={role} />
      <main className="dashboard-content">
        <RouterComponent role={role} />
      </main>
      <Footer />
    </div>
  );
};
