var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight'); //visible height container
    var scrollTop = messages.prop('scrollTop');  //how much have client scroll on top
    var scrollHeight = messages.prop('scrollHeight'); //the entire height of message container regardless how mnay messags in the browser
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
/*  | {    }   |  scrollTop     entire thing is scrollHeight
    | |    |   |  clientHeight
    | |    |   |  clientHeight
    |          |
    |          |*/
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        console.log('should scroll');
        messages.scrollTop(scrollHeight);
    }
}

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
    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    /*console.log(newMessage)
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from} ${formattedTime} - ${newMessage.text}`);
    jQuery('#messages').append(li);*/
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
       text: newMessage.text,
       from: newMessage.from,
       createdAt: formattedTime
   });
   jQuery('#messages').append(html);
   scrollToBottom();
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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
    var messageTextbox =  jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'Frank',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location')
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    locationButton.attr('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        locationButton.removeAttr('disabled');
    }, (err) => {
        alert(err)
    })
});