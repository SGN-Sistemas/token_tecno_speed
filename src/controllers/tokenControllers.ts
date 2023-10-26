import { Request, Response } from "express";
import AppError from "../middlewares/AppError";
import { VerifyToken } from "../services/verifyTimeTokenService";
import { CreateTokenService } from "../services/tokenCreateService";

export class TokenControllers {
    public async createToken(request: Request, response: Response):Promise<Response>{
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

        return response.status(status).json({message})

    }
}