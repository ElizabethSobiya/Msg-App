const express = require('express');
const { Socket } = require('socket.io');
const app = express()
const port = 8000
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
} )

io.on("connection", (socket) => {
    console.log(`user connected`);
    // socket.on("message", (msg) => {
    // //  console.log(msg);
    // io.emit('message', msg)
    // })
    socket.on('message', () => {
        console.log(`${userMessage} send by ${userName}`);
        io.emit("message")
    } )
})

// io.on("message", () => {

// })

http.listen(port, () => {
    console.log(`server is running on the port ${port}`)
})