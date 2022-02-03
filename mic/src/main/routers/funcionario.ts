import { Router } from "express";
import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import loginRouter from './login'
import prestadorRouter from './prestador'

dotenv.config()

const FUNCIONARIO_USER_POOL_ID = process.env.FUNCIONARIO_USER_POOL_ID
const FUNCIONARIO_CLIENT_ID = process.env.FUNCIONARIO_CLIENT_ID

const env = load({
    FUNCIONARIO_USER_POOL_ID: String,
    FUNCIONARIO_CLIENT_ID: String,
})

const router = Router()

router.use((req, res, next) => {
    res.setHeader('cognitouserpool', env.FUNCIONARIO_USER_POOL_ID || FUNCIONARIO_USER_POOL_ID || '')
    res.setHeader('clientId', env.FUNCIONARIO_CLIENT_ID || FUNCIONARIO_CLIENT_ID || '')
    
    console.log('req ->>> ' + req.headers["cognitoUserPool"]);
    console.log('cognitouserpool ->>>> ' + res.getHeader("cognitouserpool"));
    console.log('clientId ->>>> ' + res.getHeader("clientId"));
    next()
})

router.use("/login", loginRouter)
router.use("/prestador", prestadorRouter)

export default router