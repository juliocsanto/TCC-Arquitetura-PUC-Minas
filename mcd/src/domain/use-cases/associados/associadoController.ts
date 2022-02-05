import { Request, Response } from 'express'
import { AssociadoServices } from '../../services/associadoServices'

export const add = async (req: Request, res: Response) => {
    console.log("Add Associado");

    try {
        const createdAssociado = await AssociadoServices.addAssociado(req);

        if (createdAssociado?.error) {
            res.status(500).json({ "error": createdAssociado?.error })
        }

        res.status(201).json(createdAssociado);
    } catch (err) {
        res.status(500).json({ "error": err })
    }
}

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll Associadoes");

    // const isValidSession = await isUserSessionActive(req, res)

    // if (!isValidSession) {
    //     return res.status(400).json({ "error": "Sessão de usuário inválida/expirada" })
    // }

    try {
        const allAssociadoes = await AssociadoServices.getAllAssociados();
        res.setHeader('content-type','application/json')
        if (!allAssociadoes || allAssociadoes.length === 0) {
            return res.status(404).json("There is no Associado published yet!");
        }
        // console.log(allAssociadoes);

        return res.send(allAssociadoes)

    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}

export const get = async (req: Request, res: Response) => {
    console.log("Get Associado");

    try {
        const Associado = await AssociadoServices.getAssociado(req);

        res.setHeader('content-type','application/json')

        if (!Associado) {
            return res.status(404).json({"error": `Associado ${req.params.cnpj} not found`});
        }

        console.log(Associado);

        return res.send(Associado)

    } catch (error: any) {
        console.log(`Could not fetch Associado: ${error.message}`);
        res.status(500).json({"error": error.message});
    }
}