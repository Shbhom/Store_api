import { Request, Response } from "express";
import prisma from "..";
import Sneakers from "../sneakers.json";

export async function getSneaker(req: Request, res: Response) {
    const { brand } = req.query
    let sneakers
    if (brand && typeof brand === 'string') {
        sneakers = await prisma.sneakers.findMany({
            where: { brand: brand }
        })
    } else {
        sneakers = await prisma.sneakers.findMany()
    }
    res.status(200).json({ sneakers })
}

export async function getSneakerById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const sneakers = await prisma.sneakers.findUnique({
            where: { id: id }
        })
        res.status(200).json({ sneakers })
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export async function addSneakers(req: Request, res: Response) {
    try {
        const data = req.body
        const sneaker = await prisma.sneakers.create({
            data: data
        })
        res.status(200).json({ sneaker })
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export async function updateSneakers(req: Request, res: Response) {
    try {
        const { id, title, description, price, size, color }: { id: string, title: string, description: string, price: number, size: number[], color: string[] } = req.body
        const data: any = {}
        if (title) {
            data.title = title
        }
        if (description) {
            data.description = description
        }
        if (price) {
            data.price = price
        }
        if (size) {
            data.size = size
        }
        if (color) {
            data.color = color
        }
        const updatedSneaker = await prisma.sneakers.update({
            where: { id: id },
            data: data
        })
        res.status(200).json({ updatedSneaker })
    } catch (e: any) {
        res.status(500).json({ message: e.message })
    }
}

export async function addMultipleSneakers(req: Request, res: Response) {
    try {
        const sneakers = await prisma.sneakers.createMany({
            data: Sneakers
        })
        res.status(200).json({ message: `${sneakers.count} sneakers added` })
    } catch (e: any) {
        res.status(200).json({ message: e.message })
    }
}

export async function deleteSneakers(req: Request, res: Response) {
    const { id } = req.params
    const deletedSneakers = await prisma.sneakers.delete({
        where: { id: id }
    })
    res.status(200).json({ message: `sneaker with id:${id} deleted` })
}