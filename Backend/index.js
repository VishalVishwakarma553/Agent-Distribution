import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./utils/db.js"
import authRoutes from "./routes/auth.route.js"
import agentRoutes from "./routes/agent.route.js"
import assigningListRoute from "./routes/assignedList.route.js"

dotenv.config()

const app = express()
const corsoption = {
    origin:"http://localhost:5173",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsoption))
app.use(express.json())
app.use(cookieParser())

//api's
app.use("/api/v1/user", authRoutes)
app.use("/api/v1/agent", agentRoutes)
app.use("/api/v1/assign", assigningListRoute)
app.get("/", (req, res) => {
    res.send({message : "api is working"})
})

app.listen(process.env.PORT, () => {
    connectDB()
    console.log("server started on port 4000")
})
