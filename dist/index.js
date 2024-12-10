"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8000);
const wss = new ws_1.WebSocketServer({ server: httpServer }); // create a websocket client 
wss.on('connection', (socket) => {
    socket.on('error', console.error);
    socket.on('message', (message) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`);
            }
        });
    });
    socket.send('hello message from the server');
});
