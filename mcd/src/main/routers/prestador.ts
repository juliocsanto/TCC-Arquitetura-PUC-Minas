import { Router } from "express";
import { add, getAll, get} from '../../domain/use-cases/prestadores/prestadorController'

const router = Router()

router.get("/", getAll)

router.get('/:cnpj', get)

router.post("/", add)

export default router