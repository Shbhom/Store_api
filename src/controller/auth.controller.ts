import { Request, Response } from "express";
import bcrypt from "bcrypt"
import prisma from "..";
import { signJwt } from "../utils/jwt.utils";
import { access } from "fs";


export async function registerController(req: Request, res: Response) {
    try {
        const { name, email, phone, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                password: hash
            }
        })
        const cart = await prisma.cart.create({
            data: {
                userId: user.id
            }
        })
        const accessToken = signJwt({ user }, "15m")
        const refreshToken = signJwt({ userId: user.id }, "2d")
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        res.status(201).json({
            status: "Successfull",
            message: `user ${user.name} created`
        })
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
}

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findFirst({
            where: { email: email }
        })
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: `NO user with ${email} found`
            })
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(403).json({
                    status: "Failed",
                    message: `incorrect Password`
                })
            } else {
                const accessToken = signJwt({ user }, "15m")
                const refreshToken = signJwt({ userId: user.id }, "2d")
                res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 })
                res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
                res.status(200).json({
                    status: "Successfull",
                    message: `Welcome ${user.name}`
                })
            }
        }
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
}
