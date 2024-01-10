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

export function errorHandler(err: CustomError | TypeError, _: Request, res: Response) {
    let customErr = err
    if (!(err instanceof CustomError)) {
        customErr = new CustomError(err.message, 500)
    }
    return res.status((customErr as CustomError).statusCode).json({
        message: customErr.message
    })
}