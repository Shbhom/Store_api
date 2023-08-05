import express from "express"
import verifyUser from "../middleware/verifyUser.middleware"
import { getUserCart } from "../controller/user.controller"
import { addToCart, removeFromCart } from "../controller/cart.controller"

const cartRouter = express.Router()

cartRouter.get("/", verifyUser, getUserCart)
cartRouter.patch("/", verifyUser, addToCart)
cartRouter.delete("/", verifyUser, removeFromCart)

export default cartRouter