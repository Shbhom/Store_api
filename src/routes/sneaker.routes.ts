import express from "express"
import verifyUser from "../middleware/verifyUser.middleware"
import { addMultipleSneakers, addSneakers, deleteSneakers, getSneaker, getSneakerById, updateSneakers } from "../controller/sneaker.controller"
const SneakerRouter = express.Router()

SneakerRouter.get("/", verifyUser, getSneaker)
SneakerRouter.get("/:id", verifyUser, getSneakerById)
SneakerRouter.post("/", verifyUser, addSneakers)
SneakerRouter.post("/multiple", verifyUser, addMultipleSneakers)
SneakerRouter.put("/", verifyUser, updateSneakers)
SneakerRouter.delete("/:id", verifyUser, deleteSneakers)

export default SneakerRouter