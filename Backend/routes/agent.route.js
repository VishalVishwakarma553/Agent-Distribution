import express from "express"
import { AddAgent, deleteAgent, getAllAgent } from "../controllers/agent.controller.js"
const router = express.Router()

router.post("/addAgent", AddAgent)
router.post("/getAgent", getAllAgent)
router.post("/deleteAgent", deleteAgent)
export default router