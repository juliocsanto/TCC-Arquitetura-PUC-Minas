import express from 'express';
import db from '../data/infra/redisDb'
import indexRouter from './routers/index';
import prestadorRouter from './routers/prestador'
import associadoRouter from './routers/associado'
// import rabbitmqRouter from './routers/rabbitmq'

const app = express()

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/", indexRouter)
app.use("/prestador", prestadorRouter)
app.use("/associado", associadoRouter)
// app.use("/queue", rabbitmqRouter)   

const redisClient = db.initDb()

export { 
    app, 
    redisClient 
}