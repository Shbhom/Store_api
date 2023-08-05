import { Request, Response } from "express";
import prisma from "..";
import { Sneakers } from "@prisma/client";

export async function getUserOrders(req: Request, res: Response) {
    try {
        const user = req.user
        const order = await prisma.order.findUnique({
            where: { userId: user.id }
        })
        res.status(200).json({ order })
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export async function createOrder(req: Request, res: Response) {
    const { sneakerId, cartId, shippingAddress } = req.body
    if (sneakerId) {
        const sneaker = await prisma.sneakers.findUnique({
            where: { id: sneakerId }
        }) as Sneakers
        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                shippingAddress: shippingAddress,
            }
        })
    }
}