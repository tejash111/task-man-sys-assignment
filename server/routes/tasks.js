import express from "express"
import { createTask, getAllTask, getSingleTask, updateTask, deleteTask, getTaskStats } from "../controller/taskController.js"
import protect from "../middleware/auth.js"
import { validate } from "../middleware/validate.js"
import { createTaskSchema, updateTaskSchema, taskIdSchema } from "../validators/taskValidator.js"

const route = express.Router()

route.get("/tasks/stats", protect, getTaskStats)
route.post("/tasks", protect, validate(createTaskSchema), createTask)
route.get("/tasks", protect, getAllTask)
route.get("/tasks/:id", protect, validate(taskIdSchema, 'params'), getSingleTask)
route.put("/tasks/:id", protect, validate(taskIdSchema, 'params'), validate(updateTaskSchema), updateTask)
route.delete("/tasks/:id", protect, validate(taskIdSchema, 'params'), deleteTask)

export default route
