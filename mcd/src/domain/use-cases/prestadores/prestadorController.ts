import { Request, Response } from 'express'
import { PrestadorServices } from '../../services/prestadorServices'

export const add = async (req: Request, res: Response) => {
    console.log("Add Prestador");

    try {
        const createdPrestador = await PrestadorServices.addPrestador(req.body);

        if (createdPrestador?.error) {
            return res.status(500).json({ "error": createdPrestador?.error })
        }

        return res.status(201).json(createdPrestador);
    } catch (err) {
        return res.status(500).json({ "error": err })
    }
}

export const getAll = async (req: Request, res: Response) => {
    console.log("GetAll Prestadores");

    try {
        const allPrestadores = await PrestadorServices.getAllPrestadores();
        res.setHeader('content-type', 'application/json')
        if (!allPrestadores || allPrestadores.length === 0) {
            return res.status(404).json("There is no prestador published yet!");
        }
        console.log(allPrestadores);

        return res.send(allPrestadores)

    } catch (error: any) {
        console.log(`Could not fetch todos: ${error.message}`);
    }
}

export const get = async (req: Request, res: Response) => {
    console.log("Get Prestador");

    try {
        const prestador = await PrestadorServices.getPrestador(req);

        res.setHeader('content-type', 'application/json')

        if (!prestador) {
            return res.status(404).json({ "error": `Prestador ${req.params.cnpj} not found` });
        }

        console.log(prestador);

        return res.send(prestador)

    } catch (error: any) {
        console.log(`Could not fetch prestador: ${error.message}`);
        return res.status(500).json({ "error": error.message });
    }
}