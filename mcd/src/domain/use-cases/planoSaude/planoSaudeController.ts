import { Request, Response } from 'express'
import { PlanoSaudeServices } from '../../services/planoSaudeServices'

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll PlanoSaudees");

    try {
        const allPlanoSaude = await PlanoSaudeServices.getAllPlanoSaude();
        res.setHeader('content-type','application/json')
        if (!allPlanoSaude || allPlanoSaude.length === 0) {
            return res.status(404).json("There is no PlanoSaude published yet!");
        }
        console.trace(allPlanoSaude);

        return res.send(allPlanoSaude)

    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}

export const get = async (req: Request, res: Response) => {
    console.log("Get PlanoSaude");

    try {
        const PlanoSaude = await PlanoSaudeServices.getPlanoSaude(req);

        res.setHeader('content-type','application/json')

        if (!PlanoSaude) {
            return res.status(404).json({"error": `PlanoSaude ${req.params.cnpj} not found`});
        }

        console.log(PlanoSaude);

        return res.send(PlanoSaude)

    } catch (error: any) {
        console.trace(`Could not fetch PlanoSaude: ${error.message}`);
        return res.status(500).json({"error": error.message});
    }
}

export const change = async (req: Request, res: Response) => {
    console.log("Put PlanoSaude");

    try {
        const PlanoSaude = await PlanoSaudeServices.changePlanoSaude(req);

        res.setHeader('content-type','application/json')

        if (!PlanoSaude) {
            return res.status(404).json({"error": `Associado ${req.params.cpf} not found`});
        }

        console.log(PlanoSaude);

        return res.send(PlanoSaude)

    } catch (error: any) {
        console.log(`Could not fetch PlanoSaude: ${error.message}`);
        res.status(500).json({"error": error.message});
    }

}