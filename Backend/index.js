import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./utils/db.js";
import authRoutes from "./routes/auth.route.js";
import agentRoutes from "./routes/agent.route.js";
import assigningListRoute from "./routes/assignedList.route.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
const corsoption = {
  origin: "https://agent-distribution.vercel.app", //http://localhost:5173
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsoption));

//api's
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/agent", agentRoutes);
app.use("/api/v1/assign", assigningListRoute);
app.get("/", (req, res) => {
  res.send({ message: "api is working" });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server started on port 4000");
});
