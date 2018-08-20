"use strict";
var url = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws/";
var socket;
var textfield = document.getElementById("textbox");
var historyLoaded = false;
function setSocket() {
    socket = new WebSocket(url);
    socket.onclose = function () {
        console.log("Socket reopened");
        setSocket();
    };
    socket.onopen = function (e) {
        if (!historyLoaded) {
            socket.send("history-request");
            historyLoaded = true;
        }
        socket.onmessage = function (messageEvent) {
            var line = document.createElement("p");
            line.innerHTML = messageEvent.data;
            textfield.appendChild(line);
        };
    };
}
setSocket();
function sendMessage() {
    var username = document.getElementById("username").value;
    var messageField = document.getElementById("message");
    var message = messageField.value;
    socket.send(username + ": " + message);
}
