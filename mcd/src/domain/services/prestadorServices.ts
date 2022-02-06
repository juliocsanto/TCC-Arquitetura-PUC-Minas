import { redisClient } from '../../main/app'

interface PrestadorData {
    name: string,
    cnpj: number,
    type: string,
    phone: string,
    email: string
}

export class PrestadorServices {
    static async addPrestador(data: PrestadorData) {
        try {
            const newPrestador: PrestadorData = {
                name: data.name,
                cnpj: data.cnpj,
                type: data.type,
                phone: data.phone,
                email: data.email
            }

            console.trace(new Date());
            console.trace(data);            

            await redisClient.connect()
                .catch(error => console.trace(error))

            await redisClient.set('prestadores', '.', '[]', "NX")
            const listaPrestadores: Array<PrestadorData> = JSON.parse(await redisClient.get('prestadores', '.'))

            const indexToDelete = listaPrestadores.findIndex((elem) => {                
                return elem.cnpj?.toString() == data.cnpj?.toString()
            })

            if (indexToDelete < 0) {
                listaPrestadores.push(newPrestador)
            } else {
                listaPrestadores[indexToDelete] = newPrestador
            }

            const response = await redisClient.set('prestadores', '.', JSON.stringify(listaPrestadores))
            console.trace(newPrestador);
            console.trace(response);
            // const response = await redisClient.arrappend("prestadores", [JSON.stringify(newPrestador)], ".")

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

    static async getAllPrestadores() {
        console.log('getAllPrestadores');

        try {
            await redisClient.connect()

            const allPrestadores = await redisClient.get('prestadores', '.')

            await redisClient.disconnect()

            return allPrestadores

        } catch (error: any) {
            console.log(`Could not fetch todos: ${error.message}`);
        }
    }

    static async getPrestador({ params }) {
        console.log('get Prestador');

        const cnpj: string = params.cnpj
        
        try {
            await redisClient.connect()

            const listaPrestadores: Array<PrestadorData> = JSON.parse(await redisClient.get('prestadores', '.'))
            
            const prestador = listaPrestadores.find((item) => {                          
                return item.cnpj?.toString() == cnpj.toString()
            })

            // console.trace(prestador);

            await redisClient.disconnect()

            return prestador

        } catch (error: any) {
            console.trace(`Could not fetch prestador: ${error.message}`);
        }
    }
}