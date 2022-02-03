import { Router } from "express";
import { add, getAll } from '../../domain/use-cases/prestadores/prestadorController'

const router = Router()

router.get("/", getAll)

router.get('/:id', (req , res) => {
    res.send('method not implemented yet')
})

router.post("/", add)

export default router