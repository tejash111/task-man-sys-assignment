import express from "express"
import { logOut, loginUser, RegisterUser, getProfile } from "../controller/authController.js"
import protect from "../middleware/auth.js"
import { validate } from "../middleware/validate.js"
import { registerSchema, loginSchema } from "../validators/authValidator.js"

const route = express.Router()

route.post("/register", validate(registerSchema), RegisterUser)
route.post("/login", validate(loginSchema), loginUser)
route.post("/logout", logOut)
route.get("/getuser", protect, getProfile)

export default route