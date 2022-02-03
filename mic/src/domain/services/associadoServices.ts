import { Associado } from "../../data/models/associado"

interface AssociadoData {
    name: string, 
    cpf: number, 
    sexo: string,
    phone: string,
    idade?: number,  
    email: string  
}

export class AssociadoServices {
    static async addAssociado(data: AssociadoData){
        try {
            const newAssociado = {
                name: data.name,
                cpf: data.cpf,
                sexo: data.sexo,
                phone: data.phone,
                idade: data.idade,
                email: data.email
            };

            const response = await new Associado(newAssociado).save();
            return response
        } catch (error: any) {
            console.log(error);
        }
    }

    static async getAllAssociados(){
        console.log('getAllAssociadoes');
        
        try {
            const allAssociados = await Associado.find();
            
            return allAssociados
            
        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }        
    }
}