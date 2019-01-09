var express = require('express'),
    index = express.Router(),
    io = require('socket.io')();

index.get('/', (req, res) => {

    res.render('index.ejs');
    io.sockets.on('connection', (socket) => {
        socket.on('new-user', (pseudo) => {
            console.log(pseudo);
            
            socket.handshake.session.userdata = pseudo;
            console.log(socket.handshake.session.userdata);
            
            socket.handshake.session.save()
        });
    });
})

module.exports = index;
