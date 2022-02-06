import { Request, Response } from 'express'
import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import { PrestadorServices } from '../../services/prestadorServices'
import { isUserSessionActive } from '../login/loginController'

export const add = async (req: Request, res: Response) => {
    console.log("Add Prestador");

    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({ "error": "Sessão de usuário inválida/expirada" })
    }

    dotenv.config()    
    const env = load({PORT: String})

    const PORT = env.PORT || process.env.PORT || 3000

    try {
        const createdPrestador = await PrestadorServices.addPrestador(req.body);

        if (createdPrestador?.error) {
            res.status(500).json({ "error": createdPrestador?.error })
        }

        const URL = `http://localhost:${PORT}/queue`
        
        const response = await PrestadorServices.sendPrestadorDataToQueue(
            URL, 
            createdPrestador
        )
        
        console.trace(response);
        
        res.status(201).json(createdPrestador);
    } catch (err) {
        res.status(500).json({ "error": err })
    }
}

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll Prestadores");

    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({ "error": "Sessão de usuário inválida/expirada" })
    }

    try {
        const allPrestadores = await PrestadorServices.getAllPrestadores();
        if (!allPrestadores || allPrestadores.length === 0) {
            return res.status(404).json("There is no prestador published yet!");
        }
        console.log(allPrestadores);

        return res.send(allPrestadores)

    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}