import { createClient } from "@supabase/supabase-js"
import "dotenv/config"
import { db } from "../db"
import { CustomError } from "../utils/error.utils"

const storage = createClient(process.env.SUPA_URL as string, process.env.SUPA_KEY as string).storage.from(process.env.SUPA_BUCKET as string)

export async function uploadToSupabase(key: string, images: Express.Multer.File[]): Promise<string[] | Error> {
    try {
        let link: string[] = []
        for (const image of images) {
            let { data, error } = await storage.upload(`${key}/${image.originalname}`, image.buffer)
            if (error) {
                throw new CustomError(error.message, 500)
            }
            if (data) {
                link.push(storage.getPublicUrl(data.path).data.publicUrl)
            }
        }
        return link
    } catch (err: any) {
        return err
    }
}

export async function doesShoeExists(brandId: string, shoeName: string): Promise<Boolean> {
    const sneaker = await db.sneaker.findFirst({ where: { brandId: brandId, title: shoeName } })
    return sneaker ? true : false
}

export async function doesBrandExists(brandName: string) {
    const brand = await db.brand.findFirst({ where: { name: brandName } })
    return brand ? true : false
}


