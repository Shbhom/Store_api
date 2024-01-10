import { Request, Response, NextFunction } from "express"
import { createProductDTO } from "./product.dto"
import { uploadToSupabase } from "./product.utils"

export async function addProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const images = req.files as Express.Multer.File[]
        const { title, description, Brand, category, size, color, price } = await createProductDTO.parseAsync(req.body)
        const link = await uploadToSupabase(`${Brand}/${title}/${color}`, images)
        return res.status(200).json({
            link
        })

    } catch (err: any) {
        return next(err)
    }
}

