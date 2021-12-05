// npm install express
// npm install socket.io
// npm init 
// socket io cdn
// npm install --save-dev nodemon

const express = require("express");
const socket = require("socket.io");

const app = express(); // initialize application and server ready

app.use(express.static("public"));

let port = process.env.PORT || 3000; // to and for motion 8080 5000
let server = app.listen(port, () => {
    console.log("Listening to port" + port)
})


let io = socket(server);

io.on("connection", (socket) => {
    console.log("make socket connection");
    
    // received data
    socket.on("beginPath", (data) => {
        // transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoundo", (data) => {
        io.sockets.emit("redoundo", data);
    })
})