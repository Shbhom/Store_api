import { db } from "../db";
import { createBrandInput, createProductInput, getProductInput } from "./product.dto";
import { brand, sneaker } from "@prisma/client";
import { doesBrandExists } from "./product.utils";

export async function createBrand(input: createBrandInput): Promise<brand> {
    return await db.brand.create({ data: { name: input.name } })
}

export async function getBrand(input: createBrandInput): Promise<brand> {
    const isBrand = await doesBrandExists(input.name)
    let brand: brand;
    if (!isBrand) {
        brand = await createBrand({ name: input.name })
    } else {
        brand = await db.brand.findFirst({ where: { name: input.name } }) as brand
    }
    return brand
}

export async function createProduct(input: createProductInput, url: string[]) {
    const brand = await getBrand({ name: input.brand })
    let sneakerData: any = {
        title: input.title,
        category: input.category,
        gender: input.gender,
        brandId: brand.id
    }
    if (input.description) {
        sneakerData.description = input.description
    }
    let sneaker = await db.sneaker.create({ data: { imagesUrl: url, ...sneakerData } })
    await db.size_Color_Quantity.create({ data: { size: input.size, color: input.color, price: Number(input.price), sneakerId: sneaker.id } }).then(async (obj) => {
    })
    sneaker = await db.sneaker.findUnique({ where: { id: sneaker.id }, include: { size_Quantity: true } }) as sneaker
    return sneaker
}

export async function getProduct(input: getProductInput): Promise<sneaker[]> {
    let sneakers = await db.sneaker.findMany({ where: { OR: [{ title: { contains: input.query } }, { description: { contains: input.query } }] }, include: { size_Quantity: true, } })
    console.log({ usingQuery: sneakers })
    if (input.category) {
        sneakers = sneakers.filter((sneaker) => sneaker.category === input.category)
        console.log({ afterCategoryFiltering: sneakers })
    }
    if (input.gender) {
        sneakers = sneakers.filter((sneaker) => sneaker.gender === input.gender)
    }
    return sneakers
}