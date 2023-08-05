import { Request, Response } from "express";
import prisma from "..";

export async function getUser(req: Request, res: Response) {
    try {
        const user = req.user
        res.status(200).json({
            user: user
        })
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: "re-login"
        })

    }
}

export async function getUserCart(req: Request, res: Response) {
    try {
        const user = req.user
        const userCart = await prisma.cart.findFirst({
            where: { userId: user.id }
        })
        res.status(200).json({ userCart })
    } catch (e: any) {
        res.status(500).json({ message: "re-login" })
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { name, email, phone } = req.body
        const user = req.user
        const data: any = {}
        if (name) {
            data.name = name
        }
        if (email) {
            data.email = email
        }
        if (phone) {
            data.phone = phone
        }
        const updateUser = await prisma.user.update({
            where: { id: user.id },
            data: data
        })
        res.status(200).json({
            updateUser
        })
    } catch (e: any) {
        res.status(500).json({
            status: "Failed",
            message: "re-login"
        })
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const user = req.user
        const deleteCart = await prisma.cart.delete({
            where: { userId: user.id }
        })
        const deleteUser = await prisma.user.delete({
            where: { id: user.id }
        })
        res.status(200).json({ status: "Successfull" })
    } catch (e: any) {
        res.status(500).json({ status: "Failed", message: e.message })
    }
}