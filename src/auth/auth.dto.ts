import z from "zod"

export type createUserInput = z.infer<typeof registerDTO>
export type loginInput = z.infer<typeof loginDTO>

export const registerDTO = z.object({
    name: z.string().min(1).max(100),
    email: z.string().min(1).email(),
    password: z.string().min(1).max(14)
})

export const loginDTO = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1).max(14)
})