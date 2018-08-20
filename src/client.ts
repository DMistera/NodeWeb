
var url = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws/";
var socket = new WebSocket(url);
var textfield = document.getElementById("textbox") as HTMLElement;

socket.onopen = (e) => {
    socket.onmessage = (messageEvent) => {
        var line = document.createElement("p");
        line.innerHTML = messageEvent.data;
        textfield.appendChild(line);
    }
}

function sendMessage() {
    var username = (document.getElementById("username") as any).value;
    var messageField = document.getElementById("message") as any;
    var message = messageField.value;
    socket.send(`${username}: ${message}`);
}