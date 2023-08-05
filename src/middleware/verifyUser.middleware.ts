import { Request, Response, NextFunction } from "express";
import { signJwt, verfiyJwt } from "../utils/jwt.utils";
import { log } from "console";
import prisma from "..";

export default async function verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { accessToken, refreshToken } = req.cookies
        const { decode: accessDecode, expired: accessexpired } = verfiyJwt(accessToken)
        if (accessDecode) {
            //@ts-ignore
            req.user = accessDecode.user
            return next()
        }
        const { decode: refreshDecode, expired: refreshexpired } = accessexpired && refreshToken ? verfiyJwt(refreshToken) : { decode: null, expired: true }
        if (refreshDecode) {
            //@ts-ignore
            const user = await prisma.user.findUnique({
                where: {
                    //@ts-ignore
                    id: refreshDecode.userId
                }
            })
            const newAccessToken = signJwt({ user: user! }, "15m")
            const newUser = verfiyJwt(newAccessToken)
            //@ts-ignore
            req.user = newUser!.decode.user
            res.cookie("accessToken", newAccessToken, { secure: true, httpOnly: true, maxAge: 15 * 60 * 1000 })
            return next()
        }
        res.status(403).json({
            status: "Failed",
            message: "Tokens expired relogin to continue"
        })
        return next()
    } catch (error: any) {
        res.status(403).json({
            status: "Failed",
            message: error.message
        })
        return next()
    }
}