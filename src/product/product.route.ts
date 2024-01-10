import express from "express"
import { upload } from "../utils/multer"
import { addProduct } from "./product.controller"
const productRouter = express.Router()

productRouter.post("/new", upload.array('products'), addProduct)

export default productRouter