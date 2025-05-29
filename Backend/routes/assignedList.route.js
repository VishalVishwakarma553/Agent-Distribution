import express from "express"
import { distributeList, List } from "../controllers/assignedList.controller.js"
const router = express.Router()

router.post("/distribute", distributeList)
router.get("/list/:agentId", List)
export default router