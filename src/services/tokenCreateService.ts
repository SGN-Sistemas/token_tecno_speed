interface IResponse {
    message: string | {
        token: string;
        data_criacao: string;
    };
    status: number
}
export class CreateTokenService{
    public async execute():Promise<IResponse>{
        try {
            return{
                message: '',
                status: 500
            }
        } catch (error) {
            return{
                message: '',
                status: 500
            }
        }
    }
}