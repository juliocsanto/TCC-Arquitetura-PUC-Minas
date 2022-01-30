import { Router } from "express";
const router = Router()

router.get("/", (req, res) => {
    console.log("Hello, Prestador");
    res.send("Hello PRESTADOR API Versão v1.0")
})

export default router