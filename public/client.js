// const socket = io("http://localhost:8000");
var socket = io('https://quiet-tor-11571.herokuapp.com', { transports: ['websocket', 'polling', 'flashsocket'] });
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");
const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("chat");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
}


const n = prompt("Enter your name to join ");
// const name = "balajee";
if(n!=(null||"")){
socket.emit("new-user-joined", n);
socket.on("user-joined", n => {
  
    append(`${n} joined the chat`, "right");
    
});
socket.on("receive", data => {
    console.log(data.n);
    if(data.n !== n){
    append(`${data.n} : \n${data.message}`, "left");
    }
});
socket.on("left", n => {
    append(`${n} left the chat`, "right");
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    // const message = messageInput.innerText;
    append(`${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
})
}