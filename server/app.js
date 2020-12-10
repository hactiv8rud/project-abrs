const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

const messages = [
  {
    name: 'Admin',
    message: 'Welcome to Wasap'
  }
]

io.on('connect', function(socket) {
  console.log('Socket.io client connected');
  socket.emit('init', messages);

  socket.on('newMessage', function(payload) {
    console.log(payload);
    messages.push(payload);
    socket.broadcast.emit('SERVER_MESSAGE', payload);
  })
});

server.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
});