import express = require('express');
import http = require('http');
import bodyparser = require('body-parser');
import websocket = require('ws');

var app = express();
var server = http.createServer(app);

app.use(express.static("bin"));
app.use(bodyparser.text());

var chatHistory : string[] = [];

var wss = new websocket.Server({server});

wss.on("connection", (ws) => {
    chatHistory.forEach((msg) => {
        ws.send(msg);
    })
    ws.on("message", (msg : string) => {
        chatHistory.push(msg);
        wss.clients.forEach((client) => {
            client.send(msg);
        })
    })
})

app.get('/',  (req, res) => {
    res.sendfile("bin/index.html");
})

server.listen(8080, () => {
    console.log('App is listening!');
})