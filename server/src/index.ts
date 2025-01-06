import express from "express";
import { connectToDatabase } from "./config/db";
import { PORT } from "./constants";
import authRoutes from "./services/auth/auth.routes";
import cors from "cors";
import { adminRoutes } from "./services/admin/admin.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectToDatabase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
