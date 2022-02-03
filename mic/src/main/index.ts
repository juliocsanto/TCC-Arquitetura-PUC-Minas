import app from './app'
import db from '../data/infra/mongooseDb'

const PORT = process.env.PORT || 3000

db.init()

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
})