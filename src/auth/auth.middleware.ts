import { Request, Response, NextFunction } from "express";
import { verifyJwt, userIdPayload, userPayload } from "../utils/jwt.utils";
import { db } from "../../prisma/db";
import { getUserJWT } from "./auth.utils";
import { CustomError } from "../utils/error.utils";



export async function verifyUser(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.cookies
    console.log(req.cookies)
    const { decode: accessDecode, expired: accessExpired } = accessToken ? verifyJwt(accessToken) : { decode: null, expired: true }
    if (accessDecode) {
        req.user = (accessDecode as userPayload).user
        return next()
    }
    const { decode: refreshDecode, expired: refreshExpired } = accessExpired && refreshToken ? verifyJwt(refreshToken) : { decode: null, expired: true }
    if (refreshDecode) {
        const user = await db.user.findUnique({ where: { id: (refreshDecode as userIdPayload).userId },include:{cart:true} })
        if (!user) {
            throw new CustomError("no user found", 404)
        }
        const { accessToken: newAccessToken, refreshToken } = getUserJWT(user)
        res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        return next()
    }
    return res.status(403).json({
        message: "re-login jwt error"
    })
}