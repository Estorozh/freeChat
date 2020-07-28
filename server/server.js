const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(5000);

io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  users[client.id] = {
    name: 'anonim',
    activeRoomLink: '',
  };
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
    join(room);
    emittedInRoom(room);
  });
  //отписываемся от комнаты
  client.on('leave', (room) => {
    client.leave(room);
  });

  //TODO отправляем сообщение в комнату в которой находимся
  client.on('chat', (data) => {
    // eslint-disable-next-line no-console
    console.log('Message received -->', data);
    io.to(user.activeRoomLink).emit('chat', data);
    //console.log(Object.keys(io.clients().server.eio.clients)); //TODO выводит список пользователей
    console.log(` ${user.name} active room ${user.activeRoomLink.replace('/chat_', '')}`)
  });

  client.on('disconnect', () => {
    delete users[client.id];
  });

  // отправляем список комнат или пользователей
  client.on('reqRoomsUsers', (numberList) => {
    let target = chatRooms;
    if (numberList == 1) {
      target = users;
    }
    client.emit('resRoomsUsers', getRoomsUsers(target));
  });

  function join(room) {
    user.activeRoomLink = room;
    client.join(room);
    client.emit('relocate', `/chat_${room}`);
  }

  function emittedInRoom(room, message) {
    let time = getTime();
    message = message ? message : `${user.name} вошел в комнату ${room}`;
    client.broadcast.to(user.activeRoomLink).emit('chat', {
      message,
      user: '@dmin',
      time,
    });
  }
});

function testingRepeatingRoom(name) {
  let { chatRooms } = FreeChat;
  let shouldAddRoom = Object.keys(chatRooms).filter((room) => room === name);
  if (!shouldAddRoom.length) {
    chatRooms[name] = { name, link: `chat_${name}` };
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
    },
  },
  // nameRoom:
  // {
  //   name: string,
  //   link: string,
  //   messages: array,
  // }
  users: {},
  //{
  //  name: string,
  //  activeRoomLink: string,
  //  connectedRooms: array
  //},
};
