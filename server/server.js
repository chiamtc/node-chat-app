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

    socket.emit('newMessage',{
        from:'Jen',
        text:'from server',
        createdAt:'today'
    })

    /*socket.on('createEmail',(newEmail)=>{
        console.log('createEmail - ' ,newEmail);
    });*/

    //client to server
    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected')
    });
});
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`server is up on ${port}`);
});
