import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "./auth/auth.router"
import userRouter from "./user/user.routes"
import productRouter from "./product/product.route"
import { verifyUser } from "./auth/auth.middleware"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use(verifyUser)
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

export default app