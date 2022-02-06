import axios, { AxiosRequestConfig } from "axios"
import { FilterQuery, QueryOptions } from "mongoose"
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
    plano_saude_info?: plano_saude_info
}

export class PlanoSaudeServices {
    static async changePlanoSaude({ body, params }) {
        console.trace("Change PlanoSaude Service");

        const cpf: string = params.cpf || body.cpf || ''

        try {
            const newPlanoSaude: plano_saude_info = {
                tipo_plano_de_saude: body.tipo_plano_de_saude || 'none',
                classe_plano_de_saude: body.classe_plano_de_saude || 'none',
                tem_plano_odonto: body.tem_plano_odonto || false,
                status: body.status || 'inativo'
            }
            
            const filter = {
                "cadastro_info.cpf": parseInt(cpf)
            }

            const options: QueryOptions = {
                new: true,
                runValidators: true
            }

            const setData = {
                $set: {"plano_saude_info": newPlanoSaude}
            }

            const newData: PlanoSaudeData = await Associado.findOneAndUpdate(filter, setData, options)

            console.trace(newData);

            return newData
            // }
            // return associadoToChange

        } catch (error: any) {
            console.log(error);
        }
    }

    static async sendPlanoSaudeDataToQueue(uri: string, data: PlanoSaudeData) {
        const config: AxiosRequestConfig = {
            headers: {
                "Routing-Queue-Key": "planosaude_info"
            },            
        }
        const response = await axios.post(uri, data, config)

        // console.trace(response)

        return response
    }

    static async getAllPlanoSaude() {
        console.log('getAllPlanoSaude');

        try {
            const allPlanoSaudes = await Associado.find();

            return allPlanoSaudes

        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }
    }
}