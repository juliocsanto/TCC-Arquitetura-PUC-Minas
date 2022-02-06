import app from './app'
import db from '../data/infra/mongooseDb'
import { createManyRequestsToAPI } from '../validation/stressTest' 

async function bootstrap() {
    const PORT = process.env.PORT || 3000

    db.init()

    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`);
    })
    try {
        await createManyRequestsToAPI()
    } catch (error) {
        console.log(error);        
    }

}

bootstrap()
