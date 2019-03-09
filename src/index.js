const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const http = require('http');
const path = require('path');

// initializing server and sockets
const app = express();
const server= http.createServer(app);
const io = socketio.listen(server);

// connection to the server
mongoose.connect('mongodb://ak3133:ak3133@ds163255.mlab.com:63255/chat-database')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// settings 
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// sockets
require('./sockets')(io);

// starting the server
server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});


