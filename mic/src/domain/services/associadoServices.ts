import { Associado } from "../../data/models/associado"

interface AssociadoData {
    cadastro_info: {
        name: string,
        cpf: number,
        idade?: number,
        phone: string,
        email: string,
        sexo: string,
    }
}

export class AssociadoServices {
    static async addAssociado({ body }) {
        try {
            const newAssociado: AssociadoData = {
                cadastro_info: {
                    name: body.name,
                    cpf: body.cpf,
                    sexo: body.sexo,
                    phone: body.phone,
                    idade: body.idade,
                    email: body.email
                }
            };

            const response = await new Associado(newAssociado).save();
            return response
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
}