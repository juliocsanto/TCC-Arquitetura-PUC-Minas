import axios, { AxiosRequestConfig } from "axios";
import { Associado } from "../../data/models/associado"
import { AssociadoData } from '../types/types'

export class AssociadoServices {
    static async addAssociado(data: AssociadoData) {
        try {
            return await new Associado(data).save();
        } catch (error: any) {
            console.trace(error);
        }
    }

    static async getAllAssociados() {
        console.log('getAllAssociadoes');

        try {
            const allAssociados = await Associado.find();

            return allAssociados

        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }
    }

    static async sendAssociadosDataToQueue(uri: string, data: AssociadoData){
        const config: AxiosRequestConfig = {
            headers: {
                "Routing-Queue-Key":"associado"
            }
        }
        const response = await axios.post(uri, data, config)
        
        console.trace(new Date());
        console.log(response.status);
        console.log(response.data);   

        return 
    }
}