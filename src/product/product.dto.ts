import z from "zod";

export type createProductInput = z.infer<typeof createProductDTO>

export const createProductDTO = z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    Brand: z.string().min(1),
    Gender: z.string().length(1),
    category: z.string().min(1),
    size: z.string().min(1),
    color: z.string().min(1),
    price: z.string().min(1),
})