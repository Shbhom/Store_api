import express from "express"
import verifyUser from "../middleware/verifyUser.middleware"
import { createOrder, getUserOrders } from "../controller/order.controller"
const orderRouter = express.Router()

orderRouter.get("/", verifyUser, getUserOrders)
orderRouter.post("/", verifyUser, createOrder)


export default orderRouter