import { Router } from "express";
import { getAll, change} from '../../domain/use-cases/planoSaude/planoSaudeController'

const router = Router()

router.get("/", getAll)

// router.get('/:cpf', get)

// router.post("/", add)
router.put("/:cpf", change)

export default router