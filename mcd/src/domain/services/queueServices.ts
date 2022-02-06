import axios, { AxiosRequestConfig } from 'axios';
import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import RabbitmqServer from '../../data/services/rabbitmq-server';

export async function listenQueues(){
    dotenv.config()
    
    const env = load({ 
        SERVER_RABBITMQ: String,
        PORT: String
    })

    const PORT = env.PORT || process.env.PORT || 3005    
    const SERVER_RABBITMQ = env.SERVER_RABBITMQ || process.env.SERVER_RABBITMQ

    const server = new RabbitmqServer(`amqp://admin:admin@${SERVER_RABBITMQ}:5672`)
    await server.start()

    await server.consume('AssociadoData', async (message) => {
        const body: any = message.content.toString()
        console.trace(body);
    
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const responseAxios = await axios.post(
            `http://localhost:${PORT}/associado`,
            body,
            config
        )
        console.trace(new Date())
        console.trace(responseAxios.status);
        console.trace(responseAxios.data);
    })

    await server.consume('PrestadorData', async (message) => {
        const body: any = message.content.toString()

        console.trace(new Date())
        console.trace(body);

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const responseAxios = await axios.post(
            `http://localhost:${PORT}/prestador`,
            body,
            config
        )
        console.trace(new Date())
        console.trace(responseAxios.status);
        console.trace(responseAxios.data);
    })

    await server.consume('PlanoSaudeAssociadoData', async (message) => {
        const body: any = message.content.toString()
        
        const cpf = body.cadastro_info?.cpf
        console.trace(body);
        console.log(new Date());        
        
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const responseAxios = await axios.put(
            `http://localhost:${PORT}/associado/plano-saude/${cpf}`,
            body,
            config
        )
    })
}