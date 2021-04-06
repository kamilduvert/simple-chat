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
  socket.on('join', ({ name, room }, callback) => {
    const { user, error } = userJoin(socket.id, name, room);

    // Error handler
    if (error) return callback(error);

    // joins user a room
    socket.join(user.room);

    // Welcome user
    socket.emit('message', { user: 'ChatBot', text: `Welcome to room ${user.room}!`});

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', { user: 'ChatBot', text: `${user.name} has joined!` });

    // Send users and room info
    io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)});
    
    callback();

  });

  // Listen for chatMessage
  socket.on('sendMessage', (message, callback) => {
    const user = getCurrentUser(socket.id);
    console.log(user);

    // Send new message to all room users
    io.to(user.room).emit('message', {user: user.name, text: message});
     
    callback();
  })
 
  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if(user) {
      io.to(user.room).emit('message', { user: 'ChatBot', text: `${user.name} has left.` });
      io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)});
    }
  });
});

// Routing
app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

