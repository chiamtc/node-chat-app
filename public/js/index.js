var socket = io();
socket.on('connect', function () {
    console.log('connected to server')
/*
    socket.emit('createEmail',{
        to:'jen@example.com',
        text:'hey random emial',
        createdAt: 'today'
    });
*/


});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage',function(newMessage){
    console.log(newMessage)
})

/*
socket.on('newEmail', function(obj){
    console.log(obj);
    console.log('new email')
});*/
