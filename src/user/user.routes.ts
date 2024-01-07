import express from "express"
import { UserById, deleteCurrentUser, deleteUserById, getCurrentUser, updateCurrUser, updateUserById } from "./user.controller"
import { verifyUser } from "../auth/auth.middleware"
const userRouter = express.Router()

userRouter.get("/", verifyUser, getCurrentUser)
userRouter.get("/:Id", verifyUser, UserById)

userRouter.patch("/", verifyUser, updateCurrUser)
userRouter.patch("/:Id", verifyUser, updateUserById)

userRouter.delete("/", verifyUser, deleteCurrentUser)
userRouter.delete("/:Id", verifyUser, deleteUserById)

export default userRouter