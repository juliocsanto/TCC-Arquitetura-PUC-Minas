import { Request, Response } from 'express'
import { PrestadorServices } from '../services/prestadorServices'
import { isUserSessionActive } from '../controllers/loginController'

export const add = async (req: Request, res: Response) => {
    console.log("Add Prestador");
    
    const isValidSession = await isUserSessionActive(req)

    if (!isValidSession) {
        return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
    }
    
    try {
        const createdPrestador = await PrestadorServices.addPrestador(req.body);
        res.status(201).json(createdPrestador);
    } catch (err) {
        res.status(500).json({"error": err})
    }
}

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll Prestadores");

    const isValidSession = await isUserSessionActive(req)

    if (!isValidSession) {
        return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
    }
    
    try {
        const allPrestadores = await PrestadorServices.getAllPrestadores();
        if (!allPrestadores || allPrestadores.length === 0) {            
            return res.status(404).json("There are no prestador published yet!");
        }
        console.log(allPrestadores);

        return res.send(allPrestadores)
        
    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}