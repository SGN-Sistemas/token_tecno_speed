import express from 'express'
import { TokenControllers } from '../controllers/tokenControllers'

export const routerToken  = express.Router()

const controller = new TokenControllers()

routerToken.get('/',controller.createToken)