import axios from "axios";
import dotenv from "dotenv";

dotenv.config()
interface IResponse {
    message: string
    token: string;
    refresh_token: string;
    data_criacao: string;
    status: number
}
export class CreateTokenService {
    public async execute(): Promise<IResponse> {
        try {
            const cnpj = process.env.CNPJ_SH
            const token = process.env.TOKEN_SH
            const url = process.env.URL
            const data = {
                cnpj_sh: cnpj,
                token_sh: token
            }
            axios.post(url + 'auth', data)
                .then((response) => {
                    const dataNow = new Date()
                    const { token, refresh_token } = response.data
                    return {
                        message:'',
                        token: token,
                        refresh_token: refresh_token,
                        data_criacao: dataNow,
                        status: 200
                    }
                })
                .catch((error) => {
                    return {
                        message: 'Requisition error on tecnoSpeed ',
                        status: error.status,
                        token: '',
                        refresh_token: '',
                        data_criacao: ''
                    }
                })
            return {
                message: 'Internal server Error',
                status: 500,
                token: '',
                refresh_token: '',
                data_criacao: ''
            }
        } catch (error) {
            return {
                message: 'Internal server Error',
                status: 500,
                token: '',
                refresh_token: '',
                data_criacao: ''
            }
        }
    }
}