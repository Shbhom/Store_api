import app from "./app";
import "dotenv/config"

const port = process.env.PORT || 5500

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`)
})