import { Request, Response, NextFunction } from "express"
export class CustomError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = Error.name
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }
}

export function errorHandler(err: CustomError, _: Request, res: Response) {
    return res.status(err.statusCode).json({
        message: err.message,
        statusCode: err.statusCode
    })
}