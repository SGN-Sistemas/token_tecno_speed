import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import AppError from './middlewares/AppError'
import { routerToken } from './routes/token.routes'

const app = express()

const port = 9006

app.use(cors({
    origin: '*'
}))

app.use('/token',routerToken)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message,
            status: error.statusCode
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server'
    })
})

app.listen(port, () => {
    console.log('====================================');
    console.log('Rodando na porta ' + port);
    console.log('====================================');
})