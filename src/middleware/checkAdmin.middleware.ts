import { Request, Response, NextFunction } from "express";

export async function checkAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user
        if (user.isAdmin) {
            return next()
        } else {
            res.status(403).json({
                message: "only admins allowed"
            })
        }
    } catch (e: any) {
        res.status(500).json({
            message: e.message
        })
    }
}