import express from 'express';
import Prestador from "./Prestador";
import PrestadorData from './types'
import db from './infra/mongooseDb'

db.init()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.post('/prestador', (req, res) => {
    const data: PrestadorData = {
        name: req.body.name,
        cnpj: req.body.cnpj,
        type: req.body.type
    }    

    try {
        const prestador = new Prestador(data)
        console.table(prestador);
        
    } catch (err) {
        
    }
    
    res.end()
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
})