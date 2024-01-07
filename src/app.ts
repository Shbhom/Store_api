import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "./auth/auth.router"
import userRouter from "./user/user.routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

export default app