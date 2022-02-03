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

            const response = await new Prestador(newPrestador).save();
            console.trace(response);
            
            return response
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
}