import { Request, Response } from 'express'
import { AssociadoServices } from '../../services/associadoServices'
import { isUserSessionActive } from '../login/loginController'

export const add = async (req: Request, res: Response) => {
    console.log("Add Associado");
    
    const url = req.originalUrl
    
    if (url.search('login') < 0) {
        const isValidSession = await isUserSessionActive(req, res)
        
        if (!isValidSession) {
            return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
        }
    }
    
    try {
        const createdAssociado = await AssociadoServices.addAssociado(req.body);
        res.status(201).json(createdAssociado);
    } catch (err) {
        res.status(500).json({"error": err})
    }
}

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll Associadoes");

    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
    }
    
    try {
        const allAssociadoes = await AssociadoServices.getAllAssociados();
        if (!allAssociadoes || allAssociadoes.length === 0) {            
            return res.status(404).json("There are no Associado published yet!");
        }
        console.log(allAssociadoes);

        return res.send(allAssociadoes)
        
    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}