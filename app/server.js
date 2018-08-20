"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var express_ws_1 = __importDefault(require("express-ws"));
var _a = express_ws_1.default(express()), app = _a.app, getWss = _a.getWss, applyTo = _a.applyTo;
app.use(express.static("app"));
var chatHistory = [];
app.ws("/ws/", function (ws, req) {
    chatHistory.forEach(function (msg) {
        ws.send(msg);
    });
    ws.on("message", function (msg) {
        chatHistory.push(msg);
        getWss().clients.forEach(function (client) {
            client.send(msg);
        });
    });
});
app.get('/', function (req, res) {
    res.sendfile("app/index.html");
});
app.listen(8000, function () {
    console.log('App is listening!');
});
