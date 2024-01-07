import { db } from "../../prisma/db"
import { user } from "@prisma/client"
import { CustomError } from "../utils/error.utils"
import { updateUserInput } from "./user.dto"


export async function getUserById(Id: string): Promise<user | CustomError> {
    const user = await db.user.findUnique({ where: { id: Id }, include: { cart: true } })
    return user ? user : new CustomError("no User found", 404)
}

export async function updateUser(input: updateUserInput, Id: string) {
    return await db.user.update({ where: { id: Id }, data: input })
}

export async function deleteUser(Id: string): Promise<Boolean | Error> {
    try {
        const isCartDeleted = await db.cart.delete({ where: { userId: Id } }) ? true : false
        if (!isCartDeleted) {
            throw new CustomError("unable to delete user cart", 500)
        }
        return await db.user.delete({ where: { id: Id } }) ? true : false

    } catch (err: any) {
        return err
    }
}