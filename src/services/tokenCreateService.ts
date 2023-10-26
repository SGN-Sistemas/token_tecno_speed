import axios from "axios";
import dotenv from "dotenv";
import { formatDbData } from "../utils/transformData";

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
            const token_sh = process.env.TOKEN_SH
            const url = process.env.URL;
            let token_tec: string = '';
            let refresh_token_tec: string = '';
            let data_criacao: string = '';
            let status: number = 500;
            let message: string = '';
            const data = {
                cnpj_sh: cnpj,
                token_sh
            }
            await axios.post(url + 'auth', data)
                .then((response) => {
                    const dataNow = new Date()
                    const { token, refresh_token } = response.data
                    message = '';
                    status = 200;
                    token_tec = token;
                    refresh_token_tec = refresh_token;
                    data_criacao = formatDbData(dataNow);
                })
                .catch((error) => {
                    message = 'Requisition error on tecnoSpeed ';
                    status = error.status;
                    token_tec = '';
                    refresh_token_tec = '';
                    data_criacao = '';
                })
            return {
                message,
                status,
                token: token_tec,
                refresh_token: refresh_token_tec,
                data_criacao: data_criacao
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