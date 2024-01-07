import express, { Request, Response } from "express"
import { loginController, registerController } from "./auth.controller"
import { verifyUser } from "./auth.middleware"
const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.get("/curr", verifyUser, function (req: Request, res: Response) {
    return res.status(200).json({
        user: req.user
    })
})

export default authRouter