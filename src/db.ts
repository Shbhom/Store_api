import { PrismaClient } from "@prisma/client";

const DB_URL = process.env.DATABASE_URL as string

export const db = new PrismaClient({
    datasourceUrl: DB_URL
})
