const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//register an event listener
//in this example, we're listneing to connection event - when a new user conencts
io.on('connection', (socket) => {
    console.log('new user connected');
    //server to client
    /*    socket.emit('newEmail', {
            from: 'mike@example.com',
            text: 'some random text',
            createdAt: 'today'
        });*/

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    /*socket.on('createEmail',(newEmail)=>{
        console.log('createEmail - ' ,newEmail);
    });*/

    //client to server
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        //io.emit() sends message to every connection whereas socket.on only emits to the connection only
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        //socket.broadcast = everytime socket.XXXX meaning the connection will have changes only - not everyone
        /* socket.broadcast.emit('newMessage',{
             from :message.from,
             text:message.text,
             createdAt: new Date().getTime()
         })*/
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected')
    });
});
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`server is up on ${port}`);
});
