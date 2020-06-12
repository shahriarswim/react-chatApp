const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const router = require('./routes/router');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./helpers/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback;
    } else {
      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to room ${user.room}`,
      });

      socket.join(user.room);

      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'admin', text: `${user.name}, has joined!` });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    }
  });

  socket.on('sendMessage', (message, callbck) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    callbck();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name}, has left.`,
      });

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
