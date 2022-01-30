import Prestador from "../models/prestador";

interface PrestadorData {
    name: string, 
    cnpj: number, 
    type: string
}

export class PrestadorServices {
    static async addPrestador(data: PrestadorData){
        try {
            const newPrestador = {
                name: data.name,
                cnpj: data.cnpj,
                type: data.type,
            };

            const response = await new Prestador(newPrestador).save();
            return response
        } catch (error: any) {
            console.log(error);
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