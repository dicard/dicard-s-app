var express = require('express');
var chat = express.Router();

chat.get('/', (req, res) => {
    res.render('chat.ejs', {chat: req.session.chat});
});

module.export = chat;