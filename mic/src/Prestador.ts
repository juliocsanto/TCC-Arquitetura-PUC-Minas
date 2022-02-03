import PrestadorData from './types'

export default class Prestador{
    name: string
    cnpj: string
    type: string

    constructor(data: PrestadorData){
        this.name = data.name
        this.cnpj = data.cnpj
        this.type = data.type
    }

    #isCnpjValid(cnpj:string): boolean{
        
        return true
    }
}

