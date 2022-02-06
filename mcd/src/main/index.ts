import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import { app } from './app'
import { listenQueues } from '../domain/services/queueServices'

async function bootstrap() {
    dotenv.config()
    const env = load({ PORT: String })
    
    const PORT = env.PORT || process.env.PORT || 3005    

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    })

    await listenQueues()
}

bootstrap()