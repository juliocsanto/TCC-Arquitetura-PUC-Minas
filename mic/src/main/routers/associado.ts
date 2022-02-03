import { Router } from "express";
import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import { add, getAll } from '../../domain/use-cases/associados/associadosController'
import loginRouter from './login'
import planoSaudeRouter from './planoSaude'

dotenv.config()

const ASSOCIADO_USER_POOL_ID = process.env.ASSOCIADO_USER_POOL_ID
const ASSOCIADO_CLIENT_ID = process.env.ASSOCIADO_CLIENT_ID

const env = load({
    ASSOCIADO_USER_POOL_ID: String,
    ASSOCIADO_CLIENT_ID: String
})

const router = Router()

router.get('/', getAll)

router.post('/', add)

router.use((req, res, next) => {
    res.setHeader('cognitouserpool', env.ASSOCIADO_USER_POOL_ID || ASSOCIADO_USER_POOL_ID || '')
    res.setHeader('clientid', env.ASSOCIADO_CLIENT_ID || ASSOCIADO_CLIENT_ID || '')
    next()
})

router.use('/login', loginRouter)
router.use('/plano-saude', planoSaudeRouter)

export default router
