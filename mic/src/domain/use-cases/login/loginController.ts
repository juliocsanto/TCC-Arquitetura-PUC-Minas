import { Request, Response } from 'express'
import { add as addAssociado } from '../associados/associadosController'
import { LoginServices } from '../../services/loginServices'
// import { AssociadoServices } from '../../services/associadoServices'

interface userData {
    name: string,
    email: string,
    phone: string,
    password: string,
    username?: string | string[] | undefined
    cpf?: number, 
    sexo?: string,
    idade?: number,
    accessToken?: string | string[] | undefined,
    idToken?: string | string[] | undefined,
    refreshToken?: string | string[] | undefined,
    userPoolId?: string | number | string[] | undefined,
    clientId?: string | number | string[] | undefined,
}

export const signUp = async (req: Request, res: Response) => {
    console.log("AddUser Controller");

    const userData: userData  = {
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        userPoolId: res.getHeader('cognitoUserPool'),
        clientId: res.getHeader('clientId'),
    }

    const ls = new LoginServices(userData)

    try {
        const response = await ls.signUp();        
               
        if (response?.error || !response) {
            throw new Error(JSON.stringify(response?.error) || "Empty")
        }

        const url = req.originalUrl

        const isAssociadoRoute = url.search('associado') > -1
    
        
        if (isAssociadoRoute) {
            await addAssociado(req, res)
        }

        res.removeHeader('clientId')
        res.removeHeader('cognitouserpool')

        return res.status(201).json({"success": "User created successfully!"});
    } catch (err: any) {
        res.status(500).json({"error": err.message})
    }
}

export const signIn = async (req: Request, res: Response) => {
    console.log("signIn Controller");
    const userData: userData  = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        userPoolId: res.getHeader('cognitoUserPool'),
        clientId: res.getHeader('clientId'),
    }

    const ls = new LoginServices(userData)

    try {
        const response = await ls.signIn();

        res.removeHeader('clientId')
        res.removeHeader('cognitouserpool')
        
        if(response?.error){
            throw new Error(response.error || JSON.stringify(response.error))
        }

        res.setHeader('refreshtoken', response.refreshToken)
        res.setHeader('idtoken', 'idtoken123456')

        res.status(200).json( { 
            refreshToken: response.refreshToken,
        })

    } catch (err: any) {
        res.status(400).json({"error": err.message})
    } 
}

export const isUserSessionActive = async (req: Request, res: Response): Promise<boolean> => {
    console.log("isUserSessionActive Controller");

    const userData: userData  = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        username: req.headers.username,
        accessToken: req.headers.accesstoken,
        idToken: req.headers.idtoken,
        refreshToken: req.headers.refreshtoken,
        userPoolId: res.getHeader('cognitoUserPool'),
        clientId: res.getHeader('clientId'),
    }
   
    const ls = new LoginServices(userData)
    
    res.removeHeader('clientId')
    res.removeHeader('cognitouserpool')

    return await ls.isUserSessionActive()
}