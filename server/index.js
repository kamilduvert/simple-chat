const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

// Run when client connects
io.on('connect', (socket) => {
  console.log('We have a new connection!!!');

  // Server receives the emission from 'join' event from client-side
  socket.on('join', ({ username, room }) => {
    console.log(`${username} has joined the chatroom ${room}`);
  });
 



  socket.on('disconnect', () => {
    console.log('User has left!')
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

