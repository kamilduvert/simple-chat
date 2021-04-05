//== Packages
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

//== Local imports
const { userJoin, userLeave, getCurrentUser, getRoomUsers } = require('./helpers/users')
const router = require('./routes');

//== Create the server & websockets
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middlewares
app.use(cors());

// Run when client connects
io.on('connection', (socket) => {
  // Server receives the emission with 'join' event from client-side
  socket.on('join', ({ username, room }, callback) => {
    const { user, error } = userJoin(socket.id, username, room);

    // Error handler
    if (error) return callback(error);

    // joins user a room
    socket.join(user.room);

    // Welcome user
    socket.emit('message', { user: 'admin', text: `${user.username}, welcome to room ${user.room}.`});

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.username} has joined!` });

    callback();

  });

  // Listen for chatMessage
  socket.on('chatMessage', (message, callback) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', {user: user.username, text: message});
     
    callback();
  })
 
  socket.on('disconnect', () => {
    console.log('User has left!!!')
  })
});

// Routing
app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

