const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(5000);

io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  users[client.id] = { name: 'anonim', activeRoomLink: '' };
  let user = users[client.id];
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
    console.log(`${user.name} disconnected`);
    delete users[client.id];
  });

  function join(room) {
    if (!chatRooms[room]) testingRepeatingRoom(room);

    const listUsers = chatRooms[room].users;
    leave(user.activeRoomLink);
    user.activeRoomLink = room;
    client.join(room);
    listUsers[user.name] = true;

    client.emit('resMessages', chatRooms[room].messages);
    io.to(room).emit('sendListUsers', Object.keys(listUsers));
    client.emit('relocate', `/chat_${room}`);
  }

  function leave(oldRoom) {
    //изначально было с подпиской на множество комнат, но логичней, что человек ходит по комнатам
    if (oldRoom != '') {
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

function testingRepeatingRoom(name) {
  let { chatRooms } = FreeChat;
  let shouldAddRoom = Object.keys(chatRooms).filter((room) => room === name);
  if (!shouldAddRoom.length) {
    chatRooms[name] = { name, link: `chat_${name}`, messages: [], users: {} };
    io.emit('resRoomsUsers', getRoomsUsers(chatRooms));
  }
}

function getRoomsUsers(target) {
  return Object.values(target).map((data) => data.name);
}

function getTime() {
  const formatTime = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return formatTime.format(new Date());
}

var FreeChat = {
  chatRooms: {
    general: {
      name: 'general',
      link: '/chat_general',
      messages: [],
      users: {},
    },
    flood: {
      name: 'flood',
      link: '/chat_flood',
      messages: [],
      users: {},
    },
  },
  // nameRoom:
  // {
  //   name: string,
  //   link: string,
  //   messages: array,
  //   users: object
  // }
  users: {},
  //{
  //  name: string,
  //  activeRoomLink: string,
  //},
};
