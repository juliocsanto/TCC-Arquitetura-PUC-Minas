import { redisClient } from '../../main/app'

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
    static async changePlanoSaude({ body, params }) {
        console.log('change PlanoSaude');

        try {
            const cpf: string = body.cadastro_info?.cpf || params.cpf

            console.trace(body);
            
            await redisClient.connect()

            const listaPlanoSaude: Array<PlanoSaudeData> = JSON.parse(await redisClient.get('associados', '.'))

            const newPlanoSaudeInfos: plano_saude_info = {
                tipo_plano_de_saude: body.plano_saude_info?.tipo_plano_de_saude,
                classe_plano_de_saude: body.plano_saude_info?.classe_plano_de_saude,
                tem_plano_odonto: body.plano_saude_info?.tem_plano_odonto,
                status: body.plano_saude_info?.status
            }

            const indexToDelete = listaPlanoSaude.findIndex((elem, index) => {
                console.trace(elem.cadastro_info?.cpf?.toString())
                console.trace(cpf.toString())
                
                return elem.cadastro_info?.cpf?.toString() == cpf.toString()
            })

            const dataChanged = {
                cadastro_info: {
                    name: body.cadastro_info?.name,
                    cpf: body.cadastro_info?.cpf,
                    idade: body.cadastro_info?.idade,
                    phone: body.cadastro_info?.phone,
                    email: body.cadastro_info?.email,
                    sexo: body.cadastro_info?.sexo,
                },
                plano_saude_info: newPlanoSaudeInfos
            }

            if (indexToDelete < 0) {
                listaPlanoSaude.push(dataChanged)
            } else {
                listaPlanoSaude[indexToDelete].plano_saude_info = newPlanoSaudeInfos
            }

            const response = await redisClient.set('associados', '.', JSON.stringify(listaPlanoSaude))
            console.trace(dataChanged);
            console.trace(response);

            await redisClient.disconnect()

            return dataChanged

        } catch (error: any) {
            console.trace(`Could not fetch PlanoSaude: ${error.message}`);
        }
    }
    // static async addPlanoSaude({body, params}) {
    //     const cpf: string = params.cpf || body.cpf
    //     try {
    //         const newPlanoSaude = {
    //             name: body.name,
    //             cpf: body.cpf,
    //             email: body.email,
    //             sexo: body.sexo,
    //             idade: body.idade,
    //             phone: body.phone,
    //             tipo_plano_de_saude: body.tipo_plano_de_saude,
    //             classe_plano_de_saude: body.classe_plano_de_saude,
    //             tem_plano_odonto: body.tem_plano_odonto,
    //             status: body.status
    //         }

    //         await redisClient.connect()
    //             .catch(error => console.trace(error))

    //         await redisClient.set('associados', '.', '[]', "NX")

    //         const listaPlanoSaude: Array<PlanoSaudeData> = JSON.parse(await redisClient.get('associados', '.'))

    //         let indexToUpdate: number = 0
    //         const dataChanged = listaPlanoSaude.map(function(item, index){
    //             if (item.cpf.toString() == cpf.toString()) {
    //                 indexToUpdate = index
    //                 item = newPlanoSaude
    //             }

    //             return item
    //         }) 

    //         console.trace(listaPlanoSaude.length); 

    //         const itemToUpdate = await redisClient.arrpop('associados', indexToUpdate, '.')

    //         const response = await redisClient.set('associados', '.', JSON.stringify(dataChanged))

    //         await redisClient.disconnect()
    //             .catch(error => console.trace(error))

    //         console.trace(response)

    //         return { success: response }
    //     } catch (error: any) {
    //         console.trace(error);

    //         return {
    //             error: error.message
    //         }
    //     }
    // }

    static async getAllPlanoSaude() {
        console.log('getAllPlanoSaudes');

        try {
            await redisClient.connect()

            const allPlanoSaudes = await redisClient.get('associados', '.')
            console.trace(allPlanoSaudes.length);

            await redisClient.disconnect()

            return allPlanoSaudes

        } catch (error: any) {
            console.log(`Could not fetch PlanoSaude: ${error.message}`);
        }
    }

    static async getPlanoSaude({ params }) {
        console.log('get PlanoSaude');

        const cpf: string = params.cpf
        try {
            await redisClient.connect()

            const listaPlanoSaude: Array<PlanoSaudeData> = JSON.parse(await redisClient.get('associados', '.'))

            const PlanoSaude = listaPlanoSaude.find((item) => {
                return item.cadastro_info.cpf.toString() == cpf.toString()
            })

            console.trace(listaPlanoSaude.length);

            await redisClient.disconnect()

            return PlanoSaude

        } catch (error: any) {
            console.log(`Could not fetch PlanoSaude: ${error.message}`);
        }
    }
}