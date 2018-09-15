const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
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

    //emitting an event to everyone on the socket/connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    //broadcast to everyone in the s
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    /*socket.on('createEmail',(newEmail)=>{
        console.log('createEmail - ' ,newEmail);
    });*/

    //client to server
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        //io.emit() sends message to every single connection whereas socket.on only emits to the connection only
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        //socket.broadcast.emit() will send message to everyone but this socket, hence, the definition of broadcast
        /* socket.broadcast.emit('newMessage',{
             from :message.from,
             text:message.text,
             createdAt: new Date().getTime()
         })*/
    });

    socket.on('createLocationMessage',(coords)=>{
       io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected')
    });
});
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`server is up on ${port}`);
});
