import express from 'express';
import indexRouter from './routers/index';
import funcionarioRouter from './routers/funcionario'
import associadoRouter from './routers/associado'
import rabbitmqRouter from './routers/rabbitmq'

const app = express()

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/", indexRouter)
app.use("/funcionario", funcionarioRouter) //difereciado pelo grupo de usuários no cognito
app.use("/associado", associadoRouter)     //difereciado pelo grupo de usuários no cognito
app.use("/queue", rabbitmqRouter)     

export default app