import express from "express"
import { AddAgent, deleteAgent, getAllAgent } from "../controllers/agent.controller.js"
const router = express.Router()

router.post("/addAgent", AddAgent)
router.get("/getAgent", getAllAgent)
router.delete("/deleteAgent", deleteAgent)
export default router