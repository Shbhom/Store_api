import express, { Request, Response } from "express"
import verifyUser from "../middleware/verifyUser.middleware"
import { deleteUser, getUser, getUserCart, updateUser } from "../controller/user.controller"
import { checkAdmin } from "../middleware/checkAdmin.middleware"
const userRouter = express.Router()

userRouter.get("/", verifyUser, getUser)
userRouter.get("/cart", verifyUser, getUserCart)
userRouter.put("/", verifyUser, updateUser)
userRouter.delete("/", verifyUser, deleteUser)

export default userRouter