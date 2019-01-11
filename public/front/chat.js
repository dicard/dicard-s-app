var chat = io.connect('http://localhost:8080/chat');

chat.on('bienvenue', function(pseudo) {
    $('#chat-zone').append('<p><i>' + pseudo + '</i> à rejoint le chat</p>')
});

$('#envoi-message').click( (e) => {

    var message = $('#message').val();
    

    e.preventDefault();
    $('#message').val('');
    chat.emit('chatMessage', message);

});

chat.on('afficheMessage', function(messageData) {
    console.log(messageData);
    $('#chat-zone').append('<p><strong>' + messageData.user + '</strong> : ' + messageData.message + '</p>');
});