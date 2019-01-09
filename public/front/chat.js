var socket = io.connect('http://localhost:8080');

var pseudo = prompt('Bienvenue, comment vous appellez vous ?')

socket.on('bienvenue', function(message) {
    $('#chat-zone').append('<p><i>' + message + '</i></p>')
});

$('#envoi-message').click( (e) => {

    var message = $('#message').val();
    console.log(message);
    

    e.preventDefault();
    $('#message').val('');
    socket.emit('message', message);

});

socket.on('message', function(message) {
    $('#chat-zone').append(message);
});