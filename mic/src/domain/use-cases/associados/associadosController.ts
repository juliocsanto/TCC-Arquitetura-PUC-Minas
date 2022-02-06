import axios from 'axios';
import { Request, Response } from 'express'
import { load } from 'ts-dotenv'
import dotenv from 'dotenv'
import { AssociadoServices } from '../../services/associadoServices'
import { isUserSessionActive } from '../login/loginController'
import { AssociadoData } from '../../types/types'

export const add = async (req: Request, res: Response) => {
    console.trace("Add Associado");
    dotenv.config()    
    const env = load({PORT: String})

    const PORT = env.PORT || process.env.PORT || 3000

    const newAssociado: AssociadoData = {
        cadastro_info: {
            name: req.body.name,
            cpf: req.body.cpf,
            sexo: req.body.sexo,
            phone: req.body.phone,
            idade: req.body.idade,
            email: req.body.email
        }
    }

    try {
        const url = req.originalUrl
        const isNotLoginRoute = url.search('login') < 0

        if (isNotLoginRoute) {
            const isValidSession = await isUserSessionActive(req, res)

            if (!isValidSession) {
                return res.status(400).json({ "error": "Sessão de usuário inválida/expirada" })
            }
        }

        const createdAssociado = await AssociadoServices.addAssociado(newAssociado);

        if (createdAssociado) {
            console.trace(createdAssociado);
            
            const URL = `http://localhost:${PORT}/queue`
            await AssociadoServices.sendAssociadosDataToQueue(URL, createdAssociado)
        }

        if (!isNotLoginRoute) {
            return createdAssociado
        }

        return res.status(201).json(createdAssociado);
    } catch (err) {
        return res.status(500).json({ "error": err })
    }
}

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll Associadoes");

    const isValidSession = await isUserSessionActive(req, res)

    if (!isValidSession) {
        return res.status(400).json({ "error": "Sessão de usuário inválida/expirada" })
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