"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var bodyparser = require("body-parser");
var websocket = require("ws");
var app = express();
var server = http.createServer(app);
app.use(express.static("bin"));
app.use(bodyparser.text());
var chatHistory = [];
var wss = new websocket.Server({ server: server });
wss.on("connection", function (ws) {
    chatHistory.forEach(function (msg) {
        ws.send(msg);
    });
    ws.on("message", function (msg) {
        chatHistory.push(msg);
        wss.clients.forEach(function (client) {
            client.send(msg);
        });
    });
});
app.get('/', function (req, res) {
    res.sendfile("bin/index.html");
});
server.listen(8080, function () {
    console.log('App is listening!');
});
