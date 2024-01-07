import z from "zod";

export type updateUserInput = z.infer<typeof updateUserDTO>

export const updateUserDTO = z.object({
    name: z.string().min(1).optional(),
    email: z.string().min(1).email().optional()
})