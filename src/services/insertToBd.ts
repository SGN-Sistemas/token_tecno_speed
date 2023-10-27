import { Prisma, PrismaClient } from "@prisma/client";
import { Itoken } from "../types/Itoken";

interface IProps {
    message: Itoken;
    status: number;
}

export class InsertToBd {
    public async execute(
        token: string,
        refresh_token: string,
        data_criacao: string
    ): Promise<IProps> {
        try {
            const prisma = new PrismaClient()
            const selectedToken = await prisma.token.findFirst()
            if (selectedToken) {
                const updateToken: Itoken = await prisma.token.update({
                    where: {
                        id: selectedToken.id
                    },
                    data: {
                        refresh_token,
                        token,
                        data_criacao: new Date(data_criacao).toISOString()
                    }
                })
                return {
                    message: updateToken,
                    status: 200
                }

            } else {
                const new_token = await prisma.token.create({
                    data: {
                        token,
                        refresh_token,
                        data_criacao: new Date(data_criacao).toISOString()
                    }
                })
                return {
                    message: new_token,
                    status: 203
                }
            }
        } catch (error) {
            return {
                message: {
                    id: 0,
                    token: '',
                    data_criacao: new Date(),
                    refresh_token: ''
                },
                status: 500
            }
        }

    }
}