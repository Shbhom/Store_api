import { createClient } from "@supabase/supabase-js"
import "dotenv/config"

const storage = createClient(process.env.SUPA_URL as string, process.env.SUPA_KEY as string).storage.from(process.env.SUPA_BUCKET as string)

export async function uploadToSupabase(key: string, images: Express.Multer.File[]): Promise<string[]> {
    let link: string[] = []
    for (const image of images) {
        let { data, error } = await storage.upload(`${key}/${image.originalname}`, image.buffer)
        if (error) {
            console.log(error.message)
            throw error
        }
        if (data) {
            link.push(storage.getPublicUrl(data.path).data.publicUrl)
        }
    }
    return link
}