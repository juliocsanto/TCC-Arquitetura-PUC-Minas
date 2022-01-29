import express from 'express';
import indexRouter from './routers/index';
import prestadoresRouter from './routers/prestadores'
import loginRouter from './routers/login'

const app = express()

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/', indexRouter)
app.use('/prestador', prestadoresRouter)
app.use('/login', loginRouter)

export default app