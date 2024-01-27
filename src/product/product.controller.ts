import { Request, Response, NextFunction } from "express"
import { createProductDTO, getProductDTO } from "./product.dto"
import { uploadToSupabase } from "./product.utils"
import { db } from "../db"
import { createProduct, getProduct } from "./product.service"

export async function addProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const images = req.files as Express.Multer.File[]
        const sneakerInfo = await createProductDTO.parseAsync(req.body)
        const link = await uploadToSupabase(`${sneakerInfo.brand}/${sneakerInfo.title}/${sneakerInfo.color}`, images)
        if (link instanceof Error) {
            throw link
        }
        const sneaker = await createProduct({ title: sneakerInfo.title, brand: sneakerInfo.brand, gender: sneakerInfo.gender, category: sneakerInfo.category, size: sneakerInfo.size, price: sneakerInfo.price, description: sneakerInfo.description, color: sneakerInfo.color }, link)
        return res.status(200).json({
            sneaker
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function getProductHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const query = await getProductDTO.parseAsync(req.query)
        const sneakers = await getProduct(query)
        return res.status(200).json({
            sneakers
        })
    } catch (err: any) {
        return next(err)
    }
}