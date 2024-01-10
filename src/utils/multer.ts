import multer from "multer";
import { measureMemory } from "vm";

export const upload = multer({
    storage: multer.memoryStorage()
})