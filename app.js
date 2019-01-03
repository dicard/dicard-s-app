var express = require('express');




var app = express();

app.get('/', function(req, res) {
    res.render('index.ejs')
});

app.get('/todolist', function(req, res) {
    res.render('todolist.ejs')
});

app.listen(8080);