import { Associado } from "../../data/models/associado"

interface plano_saude_info {
    tipo_plano_de_saude: string,
    classe_plano_de_saude: string,
    tem_plano_odonto: boolean,
    status: string,
}

interface cadastro_info {
    name: string, 
    cpf: number,
    idade: number,
    phone: string,
    email: string,
    sexo: string,
}

interface PlanoSaudeData {
    cadastro_info: cadastro_info,
    plano_saude_info: plano_saude_info
}

export class PlanoSaudeServices {
    static async changePlanoSaude({body, params}){
        const cpf = params.cpf || body.cpf
        
        try {
            const newPlanoSaude: plano_saude_info = {
                tipo_plano_de_saude: body.tipo_plano_de_saude,
                classe_plano_de_saude: body.classe_plano_de_saude,
                tem_plano_odonto: body.tem_plano_odonto,
                status: body.status
            }

            const query = {
                cpf: cpf
            }

            const associadoToChange: cadastro_info = await Associado.findOne(query, newPlanoSaude)

            const newData: PlanoSaudeData = {
                cadastro_info: associadoToChange,
                plano_saude_info: newPlanoSaude
            }

            const response = await Associado.findOneAndReplace(query, newData)

            return response
        } catch (error: any) {
            console.log(error);
        }
    }

    // static async addPlanoSaude(data: PlanoSaudeData){
    //     try {
    //         const newPlanoSaude = {
    //             name: data.name,
    //             cpf: data.cpf,
    //             email: data.email,
    //             sexo: data.sexo,
    //             idade: data.idade,
    //             phone: data.phone,
    //             tipo_plano_de_saude: data.tipo_plano_de_saude,
    //             classe_plano_de_saude: data.classe_plano_de_saude,
    //             tem_plano_odonto: data.tem_plano_odonto,
    //             status: data.status
    //         };

    //         const response = await new Associado(newPlanoSaude).save();
    //         return response
    //     } catch (error: any) {
    //         console.log(error);
    //     }
    // }

    static async getAllPlanoSaude(){
        console.log('getAllPlanoSaude');
        
        try {
            const allPlanoSaudes = await Associado.find();
            
            return allPlanoSaudes
            
        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }        
    }
}