import axios, { AxiosRequestConfig } from "axios";

export async function createManyRequestsToAPI(): Promise<void> {
    const refreshToken = `eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.IyBFoJLBV1dqqrq91DSiXXsDbXiXRG6D0g-ed5dLvfzE6iX9I8EAL-5q91n1SP2mMs8mnoPX9ATZYyz5A-8BMwHd-VMIFGm8_XRY2_kEC8yVJYYLvV9l2swflf_KLM4PnqRGGvnLLU_PWpHnjZp87OlsRDPQ6UFZL6YuNykERv0tPsMNgK3xZWgcwneQlgN0nUJiCKqtd13ITlWBEec9HG7nmBGBXSPK7q4KSdvtXQoC8IOk3ErMAouMCTfD7O8AokSzRwKQ3ietQoDPBpD819aZoQd8UUs8ogc_c3QIgaqnE-6e67hpb_Z5ipAp9ATrQsb0nl-2aFu38CAAkwtJpA.nngoTxkg2_N7UxNv.RKVLcBKUSS-5Dk1d88ljVHItqoIpXYZcl8orS80AGC1FcMTrBKZ_exERXG22wIpPzM-yCz6ZiUfCyM3MOn_nwr-eb3b_aGnZhbhoEiAwkfTE3qpvzAoBD4WCE_VktYutPOm2xL2nwnWS4KfuLcyRol8PV4je8x8DDRQacLc_PbDV_YMytl-ER2fM1nx0mTp540eK87wURDjx8vhcfoR4sJ0I4CJfJAcyp6h-JKYtTtCa-TKMbP6SliVSDg8__jmTVxACXIkwmZlRCfpJLze5Dbaiqt4RVg1hB0l2GWZA792Hq0yiLsLIgfXz68W3zqoQip0oM0MHZhlMjUgRkGaCjs0JJ90Np6d41tPVHzFgPahRELAaBt2XBrOCpXmC9Yw_aRxdefQicUM88O6ZdTGWZa0nBdesgRikwmu13qfMwaORSEIjvPD3oQVQvFwnFqZhVOc2eZdREmE_Qt_17CFPwxyaFymCpE1BQ1DoPHizCxQfyrHrgM_8Cz0Y0XLFAgwtzDHQIGYfU4FrFIixYpr40AFg491O8osWS-oua7KDoEEnb4wOWfHPih8eiLhHMb-7AUZt5LV5cmIwVw72uqyo8HyiQ5tN92nlX2FWD3t3pitscjdK-KU5FzVrXsOlZt0ssRKw9SZ3PkUSFlYHgCTErK1axZTOPN5BbbIdnS6Nw0wAAR3P4P6FJ-nG3GHMOOEfk96EOzraJi7CZZh3QSS24O7payDoGV34Q4vwPdVPM-yDF8cUCp9ldFkfi_4LYd2Gf3N_rZlImfUHYELFN2V4UZLLsaLXKO7aK9oYndg7CReiHUezLFFfIzIsKq39T4dIjpagPm2f44T8piI0cd146axjlqKMKwQV9LrprJiq_l2cK9uRveyHPhkrZXolacEFIAuriLZflKe6uLzZh1HpwodbOu0FuIl4IlN68FwgkC6rja_V1eoTzY1WyLMiWFnLklPww72kVp3xKVqXQNa4yVIIyGADFqrExjEZEWfSN0174EPsVIlt2RDs-rouSG4Y3JRsgqGcsbPE2OyR4v6VNqbb3biEMalUwjvKDii__MP_DhNCnbBK7eGDQWIrE45zLsvdadEXN4asK6hUAwFlasD5nCNnADCHqLlOpyT3vNHTYZeRsOJnoCQUKi8PPz8UnIVu2jaVMDx2noGDsBshT3xOkw_Djssum1VJGXr4fOewtmV1mwzD60xgFQrBjHW3CTV_x3NoPKD792g17K_Pa2qGFkrhyuZATVT6OLjl_i42wSWgwj7EQy6NBVrZd0velGOJ9EXySOcOSJM.zdPR425b3f1P8-OxrvfiJQ`
    const idToken = 'testeMassivo'

    for (let index = 0; index <= 5; index++) {
        try {
            const rota: any = await generateRandomAxiosParameters()
            let uri = `http://localhost:3000/${rota.url}`

            const config: AxiosRequestConfig = {
                headers: {
                    'refreshtoken': refreshToken,
                    'idToken': idToken,
                    'username': rota.body.name
                }
            }

            const responseAssociadoSignUp = await axios.post(uri, rota.body, config)
            
            console.trace(new Date());
            console.trace(responseAssociadoSignUp.status);
            console.trace(responseAssociadoSignUp.data);

        } catch (error) {
            console.trace(new Date());
            console.trace(error.status);
            console.trace(error.data);
        }
    }
}

async function generateRandomAxiosParameters() {

    const associadoSignUp = 'associado/login/signUp'
    const addPlanoSaude = 'associado/plano-saude'
    const addPrestador = 'funcionario/prestador'

    const rotas = [
        {
            url: associadoSignUp,
            body: {},
            method: 'post',
            username: "Associado"

        },
        {
            url: addPlanoSaude,
            body: {},
            method: 'put',
            username: "Associado"
        },
        {
            url: addPrestador,
            body: {},
            method: 'post',
            username: "Prestador"
        }
    ]

    const rota = rotas[0]

    if (rota.url == associadoSignUp) {
        const randomCPF = Math.floor(Math.random() * 99999999999)
        const randomCPFLength = randomCPF.toString().length
        const name = `${rota.username}_${randomCPF.toString().substring(0, 5)}`
        rota.body = {
            "cpf": randomCPF,
            "name": name,
            "phone": `+${randomCPF.toString().substring(0, 8)}`,
            "password": "#irFS92Gg",
            "email": `${name}@associado.com`
        }
    }

    return rota
}