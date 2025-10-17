import express from "express"
import { logOut, loginUser, RegisterUser, getProfile } from "../controller/authController.js"
import protect from "../middleware/auth.js"

const route = express.Router()

route.post("/register", RegisterUser)
route.post("/login", loginUser)
route.post("/logout", logOut)
route.get("/getuser", protect, getProfile)

export default route