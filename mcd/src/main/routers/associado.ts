import { Router } from "express";
import { add, getAll, get} from '../../domain/use-cases/associados/associadoController'
import planoSaudeRouter from './planoSaude'

const router = Router()

router.get("/", getAll)

router.get('/:cpf', get)

router.post("/", add)

router.use('/plano-saude', planoSaudeRouter)

export default router