import express from 'express';
import indexRouter from './routers/index';
import prestadoresRouter from './routers/prestadores'

const app = express()

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/', indexRouter)
app.use('/prestador', prestadoresRouter)

export default app