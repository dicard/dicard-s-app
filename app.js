var express = require('express'),
    path = require('path'),
    app = express(),
    server = require('http').Server(app),
    io = require ('socket.io')(server),
    ent = require('ent'),
    session = require('express-session')({
        secret: "ultratopsecret",
        resave: true,
        saveUninitialized: true
    }),
    sharedsession = require('express-socket.io-session'),
    index = require('./routers/index'),
    todolist = require ('./routers/todolist');


server.listen(8080);
app.use(express.static(path.join(__dirname, '/public')))
// oninstance la session
app.use(session);

//on use un midleware de partage de session pour socket.io
io.use(sharedsession(session, {
    autoSave: true
}));


// si aucune todolist pour la session on en creer une 
// on met en place les routes 

app.use('/', index);
// utilisation de la route todolist presente dans routers/todolist.js
app.use('/todolist', todolist);

// utilisation de la route chat présente dans routers/chat.js
// app.use('/chat', chat);




