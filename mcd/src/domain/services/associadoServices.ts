import { redisClient } from '../../main/app'

interface AssociadoData {
    cadastro_info: {
        name: string,
        cpf: number,
        idade: number,
        phone: string,
        email: string,
        sexo: string,
    },
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
            }

            await redisClient.connect()
                .catch(error => console.trace(error))

            await redisClient.set('associados', '.', '[]', "NX")

            const response = await redisClient.arrappend("associados", [JSON.stringify(newAssociado)], ".")

            await redisClient.disconnect()
                .catch(error => console.trace(error))

            console.trace(response)

            return { success: response }
        } catch (error: any) {
            console.trace(error);

            return {
                error: error.message
            }
        }
    }

    static async getAllAssociados() {
        console.log('getAllAssociados');

        try {
            await redisClient.connect()

            const allAssociados = await redisClient.get('associados', '.')
            console.trace(allAssociados.length);
            console.trace(allAssociados);

            await redisClient.disconnect()

            return allAssociados

        } catch (error: any) {
            console.log(`Could not fetch associado: ${error.message}`);
        }
    }

    static async getAssociado({ params }) {
        console.log('get Associado');

        const cpf: string = params.cpf
        try {
            await redisClient.connect()

            const listaAssociados: Array<AssociadoData> = JSON.parse(await redisClient.get('associados', '.'))

            const Associado = listaAssociados.find((item) => {
                return item.cadastro_info.cpf.toString() == cpf.toString()
            })

            console.trace(Associado);

            await redisClient.disconnect()

            return Associado

        } catch (error: any) {
            console.log(`Could not fetch associado: ${error.message}`);
        }
    }
}