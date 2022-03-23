const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const Filter = require('bad-words')
const filter = new Filter();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;
let count = 0;
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.send('index.html');
})

io.on('connection',(socket)=>{
    console.log('Client is connected!!!');
    socket.emit('message','Welcome to chat room');
    socket.on('message',(message,callback)=>{
        if(filter.isProfane(message)){
            callback('Your message was sanitized as it contains profane words!!!');
            message = filter.clean(message)
        }
        // io.emit('receivedMessage',message);
        socket.broadcast.emit('message',message);
        callback();
    })
    socket.on('sendLocation',({latitude,longitude},callback)=>{
        socket.broadcast.emit('message',`https://maps.google.com?q=${latitude},${longitude}`);
        callback();
    })
})

server.listen(PORT,()=>{
    console.log(`Node application is running on port ${PORT}`);
})