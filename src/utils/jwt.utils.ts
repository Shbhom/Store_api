import "dotenv/config"
import jwt from "jsonwebtoken"
import { user } from "@prisma/client"

const privateKey = process.env.PRIVATE_KEY as string
const publicKey = process.env.PUBLIC_KEY as string

export type userPayload = {
    user: user
}
export type userIdPayload = {
    userId: string
}

export function signJwt(payload: userIdPayload | userPayload, expiryTime: string): string {
    return jwt.sign(payload, privateKey,
        {
            algorithm: "RS256", expiresIn: expiryTime
        })
}


export function verifyJwt(token: string): { decode: userPayload | userIdPayload | null, expired: Boolean } {
    try {
        const decode = jwt.verify(token, publicKey,
            {
                algorithms: ["RS256"]
            }) as userPayload | userIdPayload
        return {
            decode, expired: false
        }
    } catch (error) {
        return {
            decode: null, expired: true
        }
    }
}