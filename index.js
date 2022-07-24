const express = require('express');
const { Socket } = require('socket.io');
const app = express()
const port = 8000
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
} )

let usersConnectedCount = 0 ;

io.on("connection", (socket) => {
    usersConnectedCount++;
    io.emit("connection", usersConnectedCount)
    console.log(`user connected`);
    // socket.on("message", (msg) => {
    // //  console.log(msg);
    // io.emit('message', msg)

    // })
    socket.on('message', (userMessage, userName) => {
        // console.log(`${userMessage} send by ${userName}`);
        io.emit("message", userMessage, userName)
    } )

    socket.on("deleteMessage", (id) => {
        io.emit("deleteMessage", id)
    })

    socket.on("disconnect", () => {
        usersConnectedCount--;
        io.emit("connection", usersConnectedCount)
        // console.log(`user disconnected`)
    })
})

// io.on("message", () => {

// })

http.listen(port, () => {
    console.log(`server is running on the port ${port}`)
})