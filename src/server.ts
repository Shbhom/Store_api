import app from "./app";
import "dotenv/config"
import { db } from "./db";

const port = process.env.PORT || 5500

app.listen(port, async () => {
    console.log(`app is running on port:${port}`)
})