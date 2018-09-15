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

socket.on('newMessage', function (newMessage) {
    console.log(newMessage)
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from} - ${newMessage.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${message.from} -`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

/*socket.emit('createMessage', {
    from: 'Frank',
    text: 'hi'
}, function(res){
    console.log(res)
});*/

/*
socket.on('newEmail', function(obj){
    console.log(obj);
    console.log('new email')
});*/

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Frank',
        text: jQuery('[name=message]').val()
    }, function (res) {
        console.log(res)
    });
});

var locationButton = jQuery('#send-location')
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }, (err) => {
        alert(err)
    })
});