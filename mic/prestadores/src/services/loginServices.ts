import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession,
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken,
    ICognitoUserSessionData,
    IAuthenticationDetailsData,
    ISignUpResult,
} from 'amazon-cognito-identity-js';

import jwt_decode from 'jwt-decode'

import { promisify } from 'util'

interface userData {
    name: string,
    email: string,
    phone: string,
    password: string,
    username?: string | string[] | undefined,
    accessToken?: string | string[] | undefined,
    idToken?: string | string[] | undefined,
    refreshToken?: string | string[] | undefined,
}

const emptyCognitoUserAttribute: CognitoUserAttribute[] = []

const poolData = {
    UserPoolId: 'us-east-1_ngWrwY1Ka',
    ClientId: '1raf9o7gdmubmmo8ep4h6tb8u8'
}

export class LoginServices {
    error: Error | undefined;
    accessToken: any;
    username: any;
    email: string;
    phone: string;
    #password: string
    refreshToken: any;
    idToken: any;

    constructor(data: userData) {
        this.username = data.username || data.name,
            this.email = data.email,
            this.phone = data.phone,
            this.#password = data.password,
            this.accessToken = data.accessToken
        this.idToken = data.idToken
        this.refreshToken = data.refreshToken

        if (this.accessToken) {

        }
    }

    async signUp(): Promise<any> {
        try {
            const dataEmail = {
                Name: 'email',
                Value: this.email
            }

            const dataPhoneNumber = {
                Name: "phone_number",
                Value: this.phone
            }

            const dataUserName = {
                Name: 'name',
                Value: this.username
            }

            const attributeEmail = new CognitoUserAttribute(dataEmail)
            const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber)
            const attributeName = new CognitoUserAttribute(dataUserName)

            const attributeList = [attributeEmail, attributePhoneNumber, attributeName]

            const userPool = new CognitoUserPool(poolData)

            let cognitoUser: any

            const signUpPromisified = promisify(userPool.signUp).bind(userPool)

            signUpPromisified(this.username, this.#password, attributeList, emptyCognitoUserAttribute)
                .then((result: ISignUpResult | undefined ) => {
                    if (result?.user) {
                        cognitoUser = result.user
                    }
                })
                .catch((err) => {
                    throw new Error(err.message || JSON.stringify(err))
                })

            if (cognitoUser) {
                return cognitoUser?.getUsername()
            }

        } catch(err: any) {
            console.log(err);
            return err.message || JSON.stringify(err)
        }
    }

    async signIn() {
        console.log('signIn Login Service');

        try {
            const userPool = new CognitoUserPool(poolData)
            const userData = {
                Username: this.email,
                Pool: userPool
            }

            const cognitoUser = new CognitoUser(userData)

            const authenticationData: IAuthenticationDetailsData = {
                Username: this.email,
                Password: this.#password
            }

            const authenticationDetails = new AuthenticationDetails(authenticationData)

            const authUserPromisified = cognitoUser.authenticateUser[promisify.custom] = (authenticationDetails: AuthenticationDetails) => {
                return new Promise((resolve, reject) => {
                    cognitoUser.authenticateUser(
                        authenticationDetails,
                        {
                            onSuccess: onSuccess => resolve(onSuccess),
                            onFailure: onError => reject(onError)
                        }
                    )
                })
            }

            await authUserPromisified(authenticationDetails)
                .then((userSession: any) => {
                    const accessToken = JSON.stringify(jwt_decode(userSession.getAccessToken().getJwtToken()))
                    const idToken = JSON.stringify(jwt_decode(userSession.getIdToken().getJwtToken()))

                    this.refreshToken = userSession.getRefreshToken().getToken()

                    this.username = JSON.parse(accessToken).username
                    this.accessToken = JSON.parse(accessToken).jti
                    this.idToken = JSON.parse(idToken).jti

                })
                .catch((err) => {
                    this.error = err
                })

            // console.trace('this.error ->>> ' + this.error)

            if (this.error) {
                return { "error": this.error.message || JSON.stringify(this.error) }
            }

            if (this.refreshToken) {
                console.trace('refreshToken ->>>>>>> ' + this.refreshToken);

                return {
                    accessToken: this.accessToken,
                    email: this.email,
                    idToken: this.idToken,
                    refreshToken: this.refreshToken,
                    username: this.username
                }
            }

            return { error: "Internal error" }

        } catch (error: any) {
            console.trace(error);
            return { "error": error.message || JSON.stringify(error) }
        }
    }

    async isUserSessionActive(): Promise<boolean> {
        const userPool = new CognitoUserPool(poolData)
        const IdToken = new CognitoIdToken({ IdToken: this.idToken });
        const AccessToken = new CognitoAccessToken({ AccessToken: this.accessToken });
        const RefreshToken = new CognitoRefreshToken({ RefreshToken: this.refreshToken })

        const sessionData: ICognitoUserSessionData = {
            IdToken: IdToken,
            AccessToken: AccessToken,
            RefreshToken: RefreshToken
        }

        let isValid: any = false

        try {
            const userSession = new CognitoUserSession(sessionData);

            const userData = {
                Username: this.username,
                Pool: userPool
            };

            const cognitoUser = new CognitoUser(userData);
            cognitoUser.setSignInUserSession(userSession);

            const getSessionPromisified = promisify(cognitoUser.getSession).bind(cognitoUser)
            
            await getSessionPromisified()
                    .then(userSession => {
                        isValid = userSession?.isValid()                    
                    })
                    .catch(err => { throw new Error(err) })
                
            return isValid

        } catch (signInError) {
            console.trace('SignInError: ', signInError)
            return isValid
        }
    }
}
