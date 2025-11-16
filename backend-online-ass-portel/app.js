import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./Route/authroute.js";
import adminRoutes from "./Route/adminroutre.js";
import userRoutes from "./Route/userRoute.js"
import department from "./Route/department.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/departments", department);
app.use("/admin/users", userRoutes);



export default app;
