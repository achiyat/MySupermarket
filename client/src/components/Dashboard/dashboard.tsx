import React, { useState, useEffect } from "react";
import { fetchUserById } from "../../services/api"; // Assuming this function is available
import "./dashboard.css";
import { Navbar } from "../Navbar/navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/footer";

interface DashboardProps {
  userId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);

  // Directly fetch user data when the component mounts
  const getUser = async (id: string) => {
    try {
      const result = await fetchUserById(id);
      if ("message" in result) {
        console.error(result.message);
      } else {
        setUser(result);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return (
    <div>
      {user ? (
        <div className="dashboard-layout">
          <Navbar user={user} />
          <main className="dashboard-content">
            <Outlet context={{ user }} />
          </main>
          <Footer />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
