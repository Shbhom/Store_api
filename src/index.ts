import express from "express"
import cookieparser from "cookie-parser"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import authRouter from "./routes/auth.routes"
import userRouter from "./routes/user.routes"
import SneakerRouter from "./routes/sneaker.routes"
import cartRouter from "./routes/cart.routes"
import orderRouter from "./routes/order.routes"
import { loadStripe } from '@stripe/stripe-js';

const port = process.env.PORT
const app = express()
const stripeKey = process.env.STRIPE_KEY


const prisma = new PrismaClient();

async function startStripe() {
    const stripe = await loadStripe(stripeKey as string)
    return stripe
}

prisma.$connect()
    .then(() => console.log("DB connected successfully"))
    .catch((e: any) => {
        console.error({ status: "Failed", message: e.message });
        process.exit(1); // Optionally exit the application if the database connection fails
    });

export default prisma;
export const stripe = startStripe().then(() => { console.log('Stripe connected successfully') })

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ extended: false }))
app.use("/api/user", authRouter)
app.use("/api/user", userRouter)
app.use("/api/user/order", orderRouter)
app.use("/api/user/cart", cartRouter)
app.use("/api/sneaker", SneakerRouter)

app.listen(port, async () => {
    console.log(`app is listening to port ${port}`)
})