var socket = io.connect('http://localhost:8080');

var pseudo = prompt('Bienvenue, choisissez un pseudo pour cette session !');

//on envoi le nouveau pseudo pour l'instancié en séssion
socket.emit('new-user', pseudo);