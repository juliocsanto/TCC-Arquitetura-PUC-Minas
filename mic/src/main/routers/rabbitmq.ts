import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import RabbitmqServer from '../../data/services/rabbitmq-server'
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res, next) => {
    dotenv.config()

    const env = load({
        SERVER_RABBITMQ: String
    })

    const SERVER_RABBITMQ = env.SERVER_RABBITMQ || process.env.SERVER_RABBITMQ

    const server = new RabbitmqServer(`amqp://admin:admin@${SERVER_RABBITMQ}:5672`)
    await server.start()

    // const hasSucceedOnpublishingInQueue = await server.publishInQueue('cadastrosMIC', JSON.stringify(req.body))
    // console.log('hasSucceedOnpublishingInQueue: ' + hasSucceedOnpublishingInQueue);
    const routingQueueKey = req.header("Routing-Queue-Key")
    console.trace(routingQueueKey);
    
    const hasSucceedOnpublishingInExchange = await server.publishInExchange('boasaude-exchange', routingQueueKey, JSON.stringify(req.body))
    console.log('hasSucceedOnpublishingInExchange: ' + hasSucceedOnpublishingInExchange);
    
    res.send(req.body)
})

export default router