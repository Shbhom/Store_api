import { Request, Response, NextFunction } from "express";
import { loginDTO, registerDTO } from "./auth.dto";
import { createUser, validateUser } from "./auth.service";
import { getUserJWT } from "./auth.utils";

export async function registerController(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = await registerDTO.parseAsync(req.body)
        const user = await createUser({ name, email, password })
        if (user instanceof Error) {
            throw user
        }
        const { accessToken, refreshToken } = getUserJWT(user)
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        return res.status(201).json({
            user
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = await loginDTO.parseAsync(req.body)
        const user = await validateUser({ email, password })
        if (user instanceof Error) {
            throw user
        }
        const { accessToken, refreshToken } = getUserJWT(user)
        console.log({ accessToken, refreshToken })
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            message: "successfully loggedIn"
        })
    } catch (err: any) {
        return next(err)
    }
}