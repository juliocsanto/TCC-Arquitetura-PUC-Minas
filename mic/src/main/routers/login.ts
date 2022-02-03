import { Router } from "express";
import { signUp, signIn } from '../../domain/use-cases/login/loginController'

const router = Router()

router.post("/signUp", signUp)

router.post("/signIn", signIn)

router.get("/", (req, res) => {
    console.log("Login GET");
    res.send("Login GET")
})

export default router