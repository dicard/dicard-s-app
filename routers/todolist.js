var express = require('express');
var todolist = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


todolist.use(function(req, res, next) {
    if(typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.get('/', (req, res) => {
    res.render('todolist.ejs', {todolist: req.session.todolist})
})
.post('/add', urlencodedParser, (req, res) => {
    if (req.body.newTodo != '') {
        req.session.todolist.push(req.body.newTask);
    }
    res.redirect('/todolist');
})
.get('/del/:id', (req, res) => {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todolist');
});

module.exports = todolist;