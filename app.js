// const io = require("socket.io")(process.env.PORT || 8000)
const express=require("express");
const http = require('node:http');
const path = require("path");

const app= express();
const io = require("socket.io")(http.Server(app));

const users = {};

io.on("connection", socket => {
    socket.on("new-user-joined", n => {
        console.log("new user ", n);
        users[socket.id] = n;
        // socket.brodcast.emit("user-joined", n);
        io.sockets.emit("user-joined", n);
    });

    socket.on("send", message => {
        // socket.brodcast.emit("receive", { message: message, n: users[socket.id] })
        io.sockets.emit("receive", { message: message, n: users[socket.id] });
    })
    socket.on("disconnect", message => {
        // socket.brodcast.emit("left", users[socket.id]);
        io.sockets.emit("left", users[socket.id]);
        delete users[socket.id];
    })
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.get("/",(req,res)=>{
  
     res.render("index")
})
const PORT=process.env.PORT||3000
app.listen(PORT,(req,res)=>{
    console.log("connected");
})
