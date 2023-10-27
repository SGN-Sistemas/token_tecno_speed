import { PrismaClient, Prisma } from '@prisma/client'
import { Itoken } from "../types/Itoken";
import { verifyToken } from '../utils/verifyExperitedToken';

interface IResponse {
    message: Itoken;
    status: number;
}
export class VerifyToken{
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    public async execute():Promise<IResponse>{
        
        try {
            const getToken:Itoken | null = await this.prisma.token.findFirst()
            if(getToken){
                if(verifyToken(getToken.token)){
                    return {
                        message: {
                            id: getToken.id,
                            token: getToken.token,
                            data_criacao: new Date(),
                            refresh_token: getToken.refresh_token
                        },
                        status: 200
                    }
                }
                return {
                    message: {
                        id: getToken.id,
                        token: getToken.token,
                        data_criacao: new Date(),
                        refresh_token: getToken.refresh_token
                    },
                    status: 204
                }
            }
            return{
                message: {
                    id: 0,
                    token: '',
                    data_criacao: new Date(),
                    refresh_token: ''
                },
                status: 204

            }
        } catch (error) {
            return{
                message: {
                    id: 0,
                    token: '',
                    data_criacao: new Date(),
                    refresh_token: ''
                },
                status: 500
            }
        }finally {
            await this.prisma.$disconnect();
        }

    }
}