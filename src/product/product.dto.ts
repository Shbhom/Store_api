import z from "zod";

export type createBrandInput = z.infer<typeof createBrandDTO>
export type createProductInput = z.infer<typeof createProductDTO>
export type getProductInput = z.infer<typeof getProductDTO>

export const createBrandDTO = z.object({
    name: z.string().min(1)
})

export const createProductDTO = z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    brand: z.string().min(1),
    gender: z.string().length(1),
    category: z.string().min(1),
    size: z.string().min(1),
    color: z.string().min(1),
    price: z.string().min(1),
})

export const getProductDTO = z.object({
    query: z.string().min(1),
    brand: z.string().min(1).optional(),
    gender: z.string().max(1).optional(),
    category: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
})