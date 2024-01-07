import { createUserInput, loginInput } from "./auth.dto";
import { db } from "../../prisma/db";
import { hasPass } from "./auth.utils";
import { user } from "@prisma/client";
import bcrypt from "bcrypt"
import { CustomError } from "../utils/error.utils";

export async function createUser(input: createUserInput): Promise<user | CustomError> {
    try {
        const hash = await hasPass(input.password)
        input.password = hash
        const user = await db.user.create({ data: { ...input } })
        const cart = user ? await db.cart.create({ data: { "userId": user.id } }) : new CustomError("no user created", 500)
        return user
    } catch (err: any) {
        return err
    }
}

export async function validateUser(input: loginInput): Promise<user | CustomError> {
    try {
        const user = await db.user.findUnique({ where: { email: input.email }, include: { cart: true } })
        console.log({ user, at: "validateUser" })
        if (!user) {
            throw new CustomError("no user found", 404)
        }
        return await bcrypt.compare(input.password, user.password) ? user : new CustomError("invalid user Credentials", 401)
    } catch (err: any) {
        return err
    }
}