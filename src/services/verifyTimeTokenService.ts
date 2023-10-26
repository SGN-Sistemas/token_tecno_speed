import { PrismaClient, Prisma } from '@prisma/client'
import { Itoken } from "../types/Itoken";

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
            const dateNow = new Date();
            const getToken:Itoken | null = await this.prisma.token.findFirst()
            if(getToken !== null){
                const dateCreate = new Date(getToken.data_criacao)
                const twelveHours = 43200000/*12 horas em milisegundos*/
                const resultDateSub = dateNow.getTime() - dateCreate.getTime()
                if (resultDateSub < twelveHours) {
                    return {
                        message: getToken.token,
                        status: 200
                    }
                }
                return {
                    message: 'Passou o prazo',
                    status: 205
                }
            }
            return{
                message: 'Sem dados',
                status: 205

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