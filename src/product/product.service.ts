import { db } from "../../prisma/db";
import { createProductInput } from "./product.dto";

export async function createProduct(input: createProductInput) {
    let sneakerData: any = {
        title: input.title,
        Brand: input.Brand,
        category: input.category,
        Gender: input.Gender,
    }
    if (input.description) {
        sneakerData.description = input.description
    }
    const imageUrl: string[] = []
    let sneaker = await db.sneaker.create({ data: { imagesUrl: imageUrl, ...sneakerData } })
    await db.size_Color_Quantity.create({ data: { size: input.size, color: input.color, price: Number(input.price), sneakerId: sneaker.id } }).then(async (obj) => {
    })
    return sneaker
}