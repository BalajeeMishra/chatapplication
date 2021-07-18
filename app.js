const io = require("socket.io")(process.env.PORT || 8000)
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
