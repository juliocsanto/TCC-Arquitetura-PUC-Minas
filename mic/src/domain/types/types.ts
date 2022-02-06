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

export {
    AssociadoData,
    plano_saude_info,
    cadastro_info,
    PlanoSaudeData
}