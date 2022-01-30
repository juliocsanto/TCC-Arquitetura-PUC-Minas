import { Router } from "express";
import { add, getAll } from '../controllers/prestadorController'
const router = Router()

router.get('/', getAll)

router.get('/:id', (req , res) => {
    res.send('method not implemented yet')
})

router.post('/', add)

router.put('/:id', (req , res) => {
    res.send('method not implemented yet')
})

router.delete('/:id', (req , res) => {
    res.send('method not implemented yet')
})

export default router
