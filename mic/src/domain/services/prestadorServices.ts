import axios, { AxiosRequestConfig } from "axios";
import { QueryOptions } from "mongoose";
import { Prestador } from "../../data/models/prestador";

interface PrestadorData {
    name: string, 
    cnpj: number, 
    type: string,
    phone: string,
    email: string
}

export class PrestadorServices {
    static async addPrestador(data: PrestadorData){
        try {
            const newPrestador = {
                name: data.name,
                cnpj: data.cnpj,
                type: data.type,
                phone: data.phone,
                email: data.email
            };

            // const prestadorCreated = await new Prestador(newPrestador).save();
            // console.trace(prestadorCreated);
            const filter = {
                cnpj: data.cnpj.toString()
            }

            const options: QueryOptions = {
                new: true,
                upsert: true,
                runValidators: true
            }

            const setData = {
                $set: newPrestador
            }

            const prestadorCreated = await Prestador.findOneAndUpdate(filter, setData, options)

            console.trace(prestadorCreated);
            return prestadorCreated
        } catch (error: any) {
            console.trace(error);

            return {
                error: error.message
            }
        }
    }

    static async getAllPrestadores(){
        console.log('getAllPrestadores');
        
        try {
            const allPrestadores = await Prestador.find();
            
            return allPrestadores
            
        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }        
    }

    static async sendPrestadorDataToQueue(uri: string, data: PrestadorData){
        const config: AxiosRequestConfig = {
            headers: {
                "Routing-Queue-Key":"prestador"
            }
        }
        const response = await axios.post(uri, data, config)
        
        console.trace(response)

        return 
    }
}