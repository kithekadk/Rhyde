import express,  {NextFunction, Request, Response, json} from 'express'
import cors from 'cors'
import http from 'http'
import WebSocket from 'ws'
import mssql from 'mssql'

import userRouter from './Routes/user.router'
import auth_router from './Routes/auth.router'
import trips_router from './Routes/trips.router'
import vehicle_router from './Routes/vehicles.router'
import { sqlConfig } from './Config/sql.config'

const app = express()

// websockets
const server = http.createServer(express)
const wss = new WebSocket.Server({server})


wss.on('connection', function connection(ws){

    // const userId = 

    ws.on('message', function incoming(data, isBinary){

        wss.clients.forEach(async function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                console.log(data);
                // const pool = await mssql.connect(sqlConfig)

                // const result = (await pool.request()
                // .input('data', data)
                // .input('isBinary', isBinary)
                // .execute('insertChats')).rowsAffected

                // console.log(result);
                
                
                client.send(data, {binary: isBinary})
            }
        })
    })
})


server.listen(4101, ()=>{
    console.log('websocket server running on port 4101'); 
})

app.use(cors())
app.use(json())

app.use('/users', userRouter)
app.use('/auth', auth_router)
app.use('/trips', trips_router)
app.use('/vehicles', vehicle_router)

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message: error.message
    })
})

let port:number = 4100;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})

// supertest
export default app
