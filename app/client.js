"use strict";
var url = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws/";
var socket = new WebSocket(url);
socket.onclose = function () {
    console.log("Socket reopened");
    socket = new WebSocket(url);
};
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
