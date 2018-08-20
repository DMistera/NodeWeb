"use strict";
var socket = new WebSocket("ws://localhost:8080");
var textfield = document.getElementById("textbox");
socket.onopen = function (e) {
    socket.onmessage = function (messageEvent) {
        var line = document.createElement("p");
        line.innerHTML = messageEvent.data;
        textfield.appendChild(line);
    };
};
function sendMessage() {
    var username = document.getElementById("username").value;
    var messageField = document.getElementById("message");
    var message = messageField.value;
    socket.send(username + ": " + message);
}
