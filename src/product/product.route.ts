import express from "express"
import { upload } from "../utils/multer"
import { addProduct, getProductHandler } from "./product.controller"
import { verifyUser } from "../auth/auth.middleware"
const productRouter = express.Router()

productRouter.post("/new", upload.array('products'), addProduct)
productRouter.get("/", getProductHandler)

export default productRouter