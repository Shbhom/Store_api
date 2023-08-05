import { Request, Response } from "express";
import prisma from "..";

export async function getUserCart(req: Request, res: Response) {
    try {
        const user = req.user
        const cart = await prisma.cart.findUnique({
            where: { userId: user.id },
            include: { sneakers: true }
        })
        res.status(200).json({ cart })
    } catch (e: any) {
        res.status(200).json({ message: e.message })
    }
}

export async function addToCart(req: Request, res: Response) {
    try {
        const { sneakerId } = req.body
        const user = req.user
        const cart = await prisma.cart.findUnique({
            where: { userId: user.id },
            include: { sneakers: true }
        })
        // Check if the sneaker already exists in the cart
        const existingSneaker = cart!.sneakers.find(item => item.sneakerId === sneakerId);
        if (existingSneaker) {
            // If the sneaker already exists, update the quantity
            await prisma.cartItems.update({
                where: { id: existingSneaker.id },
                data: { quantity: existingSneaker.quantity + 1 }
            });
        } else {
            // If the sneaker is not in the cart, add it with the specified quantity
            await prisma.cartItems.create({
                data: {
                    sneaker: { connect: { id: sneakerId } },
                    Cart: { connect: { id: cart!.id } },
                    quantity: 1
                }
            });
        }
        res.status(200).json({ message: "Sneaker added to cart successfully" });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}

export async function removeFromCart(req: Request, res: Response) {
    try {
        const { sneakerId } = req.body
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: { sneakers: true }
        })
        const existingSneaker = cart!.sneakers.find(item => item.sneakerId === sneakerId)
        const quantity = existingSneaker!.quantity - 1
        if (quantity > 0) {
            await prisma.cartItems.update({
                where: { id: existingSneaker!.id },
                data: { quantity: quantity }
            })
        } else {
            await prisma.cartItems.delete({
                where: { id: existingSneaker!.id }
            })
        }
        res.status(200).json({ message: 'sneaker quantity updated' })
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}