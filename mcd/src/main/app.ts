import express from 'express';
import db from '../data/infra/redisDb'
import indexRouter from './routers/index';
import prestadorRouter from './routers/prestador'
import associadoRouter from './routers/associado'

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

const redisClient = db.initDb()

export { 
    app, 
    redisClient 
}