import 'express-async-errors'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 9006

app.listen(port,()=>{
    console.log('====================================');
    console.log('Rodando na porta ' + port);
    console.log('====================================');
})