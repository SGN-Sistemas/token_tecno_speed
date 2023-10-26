import { PrismaClient, Prisma } from '@prisma/client'
import { Itoken } from "../types/Itoken";
import { verifyToken } from '../utils/verifyExperitedToken';

interface IResponse {
    message: string;
    status: number
}
export class VerifyToken{
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    public async execute():Promise<IResponse>{
        
        try {
            const getToken:Itoken | null = await this.prisma.token.findFirst()
            if(getToken !== null){
                if(verifyToken(getToken.token)){
                    return {
                        message: getToken.token,
                        status: 200
                    }
                }
                if(verifyToken(getToken.refresh_token)){
                    return {
                        message: getToken.refresh_token,
                        status: 202
                    }
                }
                return {
                    message: 'Passou o prazo',
                    status: 401
                }
            }
            return{
                message: 'Sem dados',
                status: 204

            }
        } catch (error) {
            return{
                message: 'Internal server erro',
                status: 500
            }
        }finally {
            await this.prisma.$disconnect();
        }

    }
}