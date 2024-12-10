import express from "express"
import { WebSocketServer } from "ws"


const app = express();
const httpServer = app.listen(8000);


const wss = new WebSocketServer({server: httpServer})  // create a websocket client 

wss.on('connection',(socket) => {
    socket.on('error', console.error)

    socket.on('message', (message) => {

        
                wss.clients.forEach(function each(client){
            if (client.readyState === WebSocket.OPEN){
                client.send(`${message}`)
            }
        })
    })
    socket.send('hello message from the server')
})