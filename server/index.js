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

  socket.on('disconnect', () => {
    console.log('Use has left!')
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
