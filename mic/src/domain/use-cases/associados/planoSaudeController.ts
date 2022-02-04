import { Request, Response } from 'express'
import { PlanoSaudeServices } from '../../services/planoSaudeServices'
import { isUserSessionActive } from '../login/loginController'

// export const add = async (req: Request, res: Response) => {
//     console.log("Add PlanoSaude ao Associado");
    
//     const isValidSession = await isUserSessionActive(req, res)

//     if (!isValidSession) {
//         return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
//     }
    
//     try {
//         const addedPlanoSaude = await PlanoSaudeServices.addPlanoSaude(req.body);
//         res.status(201).json(addedPlanoSaude);
//     } catch (err) {
//         res.status(500).json({"error": err})
//     }
// }

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
    console.log("Change PlanoSaude");
    
    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({"error": "Sessão de usuário inválida/expirada"})
    }
    
    try {
        const createdPlanoSaude = await PlanoSaudeServices.changePlanoSaude(req);
        res.status(201).json(createdPlanoSaude);
    } catch (err) {
        res.status(500).json({"error": err})
    }
}