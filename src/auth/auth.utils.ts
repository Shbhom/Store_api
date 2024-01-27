import { user } from "@prisma/client";
import { signJwt } from "../utils/jwt.utils";
import bcrypt from "bcrypt"

export function getUserJWT(user: user): { accessToken: string, refreshToken: string } {
    return { accessToken: signJwt({ user }, "15m"), refreshToken: signJwt({ userId: user.id }, "2d") }
}

export async function hashPass(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}