import express from "express"
import { createTask, getAllTask, getSingleTask, updateTask, deleteTask, getTaskStats } from "../controller/taskController.js"
import protect from "../middleware/auth.js"

const route = express.Router()

route.post("/tasks", protect, createTask)
route.get("/tasks", protect, getAllTask)
route.get("/tasks/:id", protect, getSingleTask)
route.put("/tasks/:id", protect, updateTask)
route.delete("/tasks/:id", protect, deleteTask)
route.get("/tasks/stats", protect, getTaskStats)

export default route
