"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    userCount += 1;
    console.log("user connected #" + userCount);
    socket.on("message", (event) => {
        console.log("message received : " + event.toString());
        for (let i = 0; i < sockets.length; i++) {
            let s = sockets[i];
            s.send("message from server: " + event.toString());
        }
    });
});
