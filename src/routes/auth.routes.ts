import express from "express"
import { loginController, registerController } from "../controller/auth.controller"
import verifyUser from "../middleware/verifyUser.middleware"
const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
export default authRouter