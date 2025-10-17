import express from "express"
import  { logOut, loginUser, RegisterUser, getProfile }  from "../controller/authController.js"


const route = express.Router()

route.post("/register", RegisterUser)
route.post("/login", loginUser)
route.post("/logout", logOut)
route.get("/getuser", getProfile)

export default route