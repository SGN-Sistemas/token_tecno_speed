import { Request, Response } from "express";
import AppError from "../middlewares/AppError";
import { VerifyToken } from "../services/verifyTimeTokenService";
import { CreateTokenService } from "../services/tokenCreateService";

export class TokenControllers {
    public async createToken(request: Request, response: Response):Promise<Response>{
        let token: string;
        let refresh_token:string;
        let data_criacao: string;
        const verifyToken = new VerifyToken()
        const { status,message } = await verifyToken.execute()
        console.log('====================================');
        console.log(status,message);
        console.log('====================================');
        if(status === 200){
            response.status(status).json(message)
        }
        if(status === 500){
            throw new AppError(message,status)
        }
        if(status === 204){
            const createTokenService = new CreateTokenService()
            const createTokenServiceExec = await createTokenService.execute()
            if(createTokenServiceExec.status === 500 ){
                throw new AppError(createTokenServiceExec.message,createTokenServiceExec.status)
            }
            token   =   createTokenServiceExec.token
            refresh_token = createTokenServiceExec.refresh_token
            data_criacao = createTokenServiceExec.data_criacao
        }


        return response.status(status).json({message})

    }
}