import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error.utils";
import { deleteUser, getUserById, updateUser } from "./user.service";
import { updateUserDTO } from "./user.dto";

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        return res.status(200).json({
            user: req.user
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function UserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { Id } = req.params
        if (!Id) {
            throw new CustomError("invalid url Param, no Id found", 400)
        }
        const user = await getUserById(Id)
        if (!user || user instanceof Error) {
            throw user
        }
        return res.status(200).json({
            user
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function updateCurrUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name } = await updateUserDTO.parseAsync(req.body)
        console.log(req.user)
        if (!req.user) {
            throw new CustomError("no loggedIn user found", 403)
        }
        const updatedUser = await updateUser({ email, name }, req.user.id)
        return res.status(200).json({
            updateUser
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { Id } = req.params
        if (!Id) {
            throw new CustomError("invalid url Param, No Id found", 400)
        }
        const { email, name } = await updateUserDTO.parseAsync(req.body)
        const updatedUser = await updateUser({ email, name }, Id)
        return res.status(200).json({
            updatedUser
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function deleteCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            throw new CustomError("no loggedIn user found", 403)
        }
        const isDeleted = await deleteUser(req.user.id)
        if (isDeleted instanceof Error) {
            throw isDeleted
        }
        if (!isDeleted) {
            throw new CustomError("Unable to delete user account", 500)
        }
        return res.status(204).json({
            message: "deleted Successfully"
        })
    } catch (err: any) {
        return next(err)
    }
}

export async function deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { Id } = req.params
        if (!Id) {
            throw new CustomError("invalid url Param, no Id found", 400)
        }
        const isDeleted = await deleteUser(Id)
        if (!isDeleted) {
            throw new CustomError("Unable to delete user account", 500)
        }
        return res.status(204)
    } catch (err: any) {
        return next(err)
    }
}
