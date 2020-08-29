const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var FreeChat = require('./data');
var getTime = require('./helpers/getTime');
var testingRepeatingRoom = require('./helpers/testingRepeatingRoom');
var getRoomsUsers = require('./helpers/getRoomsUsers');

io.listen(5000);
//** Socket.io functions
io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  users[client.id] = { name: 'anonim', activeRoomLink: '' };
  let user = users[client.id];
  // eslint-disable-next-line no-console
  console.log('a user connected ' + client.id);

  client.on('auth', (name) => {
    user.name = name;
  });

  client.on('create room', (name) => {
    testingRepeatingRoom(name);
    join(name);
  });

  client.on('join', (room = 'general') => {
    checkOnNewJoin(room);
    join(room);
  });

  client.on('chat', (data) => {
    io.to(user.activeRoomLink).emit('chat', data);
    let room = chatRooms[user.activeRoomLink];
    if (!room) testingRepeatingRoom(room);
    room.messages.push(data);
    client.emit('resMessages', room.messages);
  });

  client.on('reqRoomsUsers', (numberList) => {
    let target = numberList === 0 ? chatRooms : users;
    client.emit('resRoomsUsers', getRoomsUsers(target));
  });

  client.on('disconnect', () => {
    delete users[client.id];
  });

  //** Helpers functions
  function join(room) {
    if (!chatRooms[room]) testingRepeatingRoom(room);

    const listUsers = chatRooms[room].users;
    leave(user.activeRoomLink, room);
    user.activeRoomLink = room;
    client.join(room);
    listUsers[user.name] = true;

    client.emit('relocate', `/chat_${room}`);
    client.emit('resMessages', chatRooms[room].messages);
    io.to(room).emit('sendListUsers', Object.keys(listUsers));
  }

  function leave(oldRoom, newRoom) {
    //изначально было с подпиской на множество комнат, но логичней, что человек ходит по комнатам
    if (oldRoom != '' && oldRoom != newRoom) {
      client.leave(oldRoom);
      if (chatRooms[oldRoom].users[user.name]) {
        delete chatRooms[oldRoom].users[user.name];
        io.to(oldRoom).emit(
          'sendListUsers',
          Object.keys(chatRooms[oldRoom].users)
        );
      }
    }
  }

  function checkOnNewJoin(room) {
    let isNewJoin = user.activeRoomLink == room;
    if (isNewJoin) {
      emittedInRoom(room);
    }
  }

  function emittedInRoom(room, message) {
    let time = getTime();
    message = message ? message : `*вошел в комнату ${room}*`;
    client.broadcast.to(room).emit('chat', {
      message,
      user: user.name,
      time,
    });
  }
});
