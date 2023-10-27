import { Request, Response } from "express";
import AppError from "../middlewares/AppError";
import { VerifyToken } from "../services/verifyTimeTokenService";
import { CreateTokenService } from "../services/tokenCreateService";
import { InsertToBd } from "../services/insertToBd";

export class TokenControllers {
    public async createToken(request: Request, response: Response): Promise<Response> {
        let token: string;
        let refresh_token: string;
        let data_criacao: string;
        const verifyToken = new VerifyToken()
        const { status, message } = await verifyToken.execute()

        if (status === 200) {
            console.log('====================================');
            console.log(message);
            console.log('====================================');
            return response.status(status).json(message)
        }
        if (status === 500) {
            console.log('====================================');
            console.log();
            console.log('====================================');
            return response.status(status).json(message)
        }
        const createTokenService = new CreateTokenService()
        const createTokenServiceExec = await createTokenService.execute()
        if (createTokenServiceExec.status !== 200) {
            console.log('====================================');
            console.log('====================================');
            return response.json(createTokenServiceExec.message).status(createTokenServiceExec.status)
        }
        token = createTokenServiceExec.token
        refresh_token = createTokenServiceExec.refresh_token
        data_criacao = createTokenServiceExec.data_criacao

        const insertToBd = new InsertToBd()
        const execInsertToBd = await insertToBd.execute(token, refresh_token, data_criacao)
        console.log('====================================');
        console.log(execInsertToBd);
        console.log('====================================');
        return response.status(execInsertToBd.status).json(execInsertToBd)
    }
}