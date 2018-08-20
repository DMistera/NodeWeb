import express = require('express');
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());

app.use(express.static("app"));

var chatHistory : string[] = [];

app.ws("/ws/", (ws, req) => {
    ws.on("message", (msg : string) => {
        if(msg == "history-request") {
            chatHistory.forEach((msg) => {
                ws.send(msg);
            });
        }
        else {
            chatHistory.push(msg);
            console.log(getWss().clients.size);
            getWss().clients.forEach((client) => {
                client.send(msg);
            })
        }
    })
})

app.get('/',  (req, res) => {
    res.sendfile("app/index.html");
})

app.listen(8000, () => {
    console.log('App is listening!');
})