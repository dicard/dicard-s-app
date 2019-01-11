const express = require('express'), //express
    path = require('path'), //path pour gerer les chemins
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    ent = require('ent'),
    session = require('express-session')({
        secret: "ultratopsecret",
        resave: true,
        saveUninitialized: true
    }),
    sharedSession = require('express-socket.io-session'),
    index = require('./routers/index'),
    todolist = require ('./routers/todolist'),
    chat = require ('./routers/chat');


server.listen(8080);
app.use(express.static(path.join(__dirname, '/public')));
// oninstance la session
app.use(session);

//on use un midleware de partage de session pour socket.io
io.use(sharedSession(session, {
    autoSave: true
}));






// si aucune todolist pour la session on en creer une 
// on met en place les routes 

app.use('/', index);
// utilisation de la route todolist presente dans routers/todolist.js
app.use('/todolist', todolist);
//utilisation de la route chat presente dans routers/chat.js
app.use('/chat', chat);





// gestion socket IO par rapport aux différentes app
    //index
io.on('connection', (socket) => {
    socket.on('new-user', (pseudo) => {
        socket.handshake.session.userdata = pseudo;      
        socket.handshake.session.save();
        
    })
});

    //chat
var socketChat = io
    .of('/chat').use(sharedSession(session, {
        autoSave: true
    }))
    .on('connection', (socket) => {      
        socketChat.emit('bienvenue', socket.handshake.session.userdata);

        socket.on('chatMessage', (message) => {            
            var messageData = {
                user: socket.handshake.session.userdata,
                message: message
            };
            socketChat.emit('afficheMessage', messageData )
        })
    })
    

