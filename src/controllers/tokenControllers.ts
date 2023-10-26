import { Request, Response } from "express";
import AppError from "../middlewares/AppError";

export class TokenControllers {
    public async createToken(request: Request, response: Response):Promise<Response>{
        throw new AppError('test',500)
    }
}