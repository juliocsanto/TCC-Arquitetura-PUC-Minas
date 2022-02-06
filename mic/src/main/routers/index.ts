import { Router } from "express";
const router = Router()

router.get("/", (req, res) => {
    console.log("Hello, User");
    res.send("Hello User API Versão v1.0")
})

export default router