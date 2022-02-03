import { Associado } from "../../data/models/associado"

interface PlanoSaudeData {
    name: string, 
    cpf: number,
    idade: number,
    phone: string,
    tipo_plano_de_saude: string,
    classe_plano_de_saude: string,
    tem_plano_odonto: boolean,
    status: string,
    email: string,
    sexo: string
}

export class PlanoSaudeServices {
    static async addPlanoSaude(data: PlanoSaudeData){
        try {
            const newPlanoSaude = {
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                sexo: data.sexo,
                idade: data.idade,
                phone: data.phone,
                tipo_plano_de_saude: data.tipo_plano_de_saude,
                classe_plano_de_saude: data.classe_plano_de_saude,
                tem_plano_odonto: data.tem_plano_odonto,
                status: data.status
            };

            const response = await new Associado(newPlanoSaude).save();
            return response
        } catch (error: any) {
            console.log(error);
        }
    }

    static async getAllPlanoSaude(){
        console.log('getAllPlanoSaude');
        
        try {
            const allPlanoSaudes = await Associado.find();
            
            return allPlanoSaudes
            
        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }        
    }

    static async changePlanoSaude({body, params}){
        const cpf = params?.cpf
        
        try {
            const newPlanoSaude = {
                name: body.name,
                cpf: body.cpf,
                email: body.email,
                sexo: body.sexo,
                idade: body.idade,
                phone: body.phone,
                tipo_plano_de_saude: body.tipo_plano_de_saude,
                classe_plano_de_saude: body.classe_plano_de_saude,
                tem_plano_odonto: body.tem_plano_odonto,
                status: body.status
            };

            const query = {
                cpf: cpf
            }

            const changedPlano = await Associado.findOneAndUpdate(query, newPlanoSaude)

            return changedPlano
        } catch (error: any) {
            console.log(error);
        }
    }
}