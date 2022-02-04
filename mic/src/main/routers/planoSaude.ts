import { Router } from "express";
import { getAll, change } from '../../domain/use-cases/associados/planoSaudeController'

const router = Router()

router.get('/', getAll)

router.get('/:id', (req , res) => {
    res.send('method not implemented yet')
})

// router.post('/', add)

router.put('/:cpf', change)

router.delete('/:id', (req , res) => {
    res.send('method not implemented yet')
})

export default router
