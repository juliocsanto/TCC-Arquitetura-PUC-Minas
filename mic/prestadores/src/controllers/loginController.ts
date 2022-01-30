import { Request, Response } from 'express'
import { LoginServices } from '../services/loginServices'

interface userData {
    name: string,
    email: string,
    phone: string,
    password: string,
    username?: string | string[] | undefined
    accessToken?: string | string[] | undefined,
    idToken?: string | string[] | undefined,
    refreshToken?: string | string[] | undefined,
}

export const signUp = async (req: Request, res: Response) => {
    console.log("AddUser Controller");

    const userData: userData  = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    const ls = new LoginServices(userData)

    try {
        const response = await ls.signUp();
        console.log(response);

        if (response?.message) {
            throw new Error(JSON.stringify(response.message))
        }        
        
        res.status(201).json({"success": "User created successfully!"});
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
        password: req.body.password
    }

    const ls = new LoginServices(userData)

    try {
        const response = await ls.signIn();

        if(response?.error){
            throw new Error(response.error || JSON.stringify(response.error))
        }

        res.setHeader('refreshtoken', response.refreshToken)
        
        res.status(200).json( { 
            refreshToken: response.refreshToken,
        })

    } catch (err: any) {
        res.status(500).json({"error": err.message})
    } 
}

export const isUserSessionActive = async (req: Request): Promise<boolean> => {
    console.log("isUserSessionActive Controller");

    const userData: userData  = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        username: req.headers.username,
        accessToken: req.headers.accesstoken,
        idToken: req.headers.idtoken,
        refreshToken: req.headers.refreshtoken
    }
   
    const ls = new LoginServices(userData)
    
    return await ls.isUserSessionActive()
}