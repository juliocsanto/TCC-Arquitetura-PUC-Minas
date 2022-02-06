import { Request, Response } from 'express'
import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import { PlanoSaudeServices } from '../../services/planoSaudeServices'
import { isUserSessionActive } from '../login/loginController'

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll PlanoSaudees");

    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
    }
    
    try {
        const allPlanoSaudees = await PlanoSaudeServices.getAllPlanoSaude();
        if (!allPlanoSaudees || allPlanoSaudees.length === 0) {            
            return res.status(404).json("There are no PlanoSaude published yet!");
        }
        console.log(allPlanoSaudees);

        return res.send(allPlanoSaudees)
        
    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}

export const change = async (req: Request, res: Response) => {
    console.trace("Change PlanoSaude Controller");
    
    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
    }

    dotenv.config()    
    const env = load({PORT: String})

    const PORT = env.PORT || process.env.PORT || 3000
    
    try {
        const newData = await PlanoSaudeServices.changePlanoSaude(req);
        
        if (newData) {            
            const URL = `http://localhost:${PORT}/queue`
            await PlanoSaudeServices.sendPlanoSaudeDataToQueue(URL, newData)
            // console.trace(response);            
        }

        res.status(201).json(newData);
    } catch (err) {
        res.status(500).json({"error": err})
    }
}