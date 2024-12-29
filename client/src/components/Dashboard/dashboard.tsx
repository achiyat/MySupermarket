// client/src/components/Dashboard/dashboard.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { users } from "../../dictionaries/users";
import { RouterComponent } from "../RouterComponent/routerComponent";
import { Navbar } from "../Navbar/navbar";
import { Footer } from "../Footer/footer";
import "./dashboard.css";
import { SignUp } from "../SignUp/signUp";

export const Dashboard: React.FC = () => {
  const { user } = useAuth0();

  if (!user?.sub) {
    return <div>User not recognized</div>;
  }

  // Find the user object based on the id_auth0
  const currentUser = users.find((u) => u.id_auth0 === user.sub);

  if (!currentUser) {
    return <SignUp />;
  }

  const { role } = currentUser;

  return (
    <div className="dashboard-layout">
      <Navbar role={role} />
      <main className="dashboard-content">
        <RouterComponent user={currentUser} />
      </main>
      <Footer />
    </div>
  );
};
