const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(5000);

io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  users[client.id] = { name: 'anonim', connectedRooms: {} };
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

  //отписываемся от комнаты
  client.on('leave', (room) => {
    delete user.connectedRooms[room];
    client.leave(room);
  });

  client.on('chat', (data) => {
    // eslint-disable-next-line no-console
    console.log('Message received -->', data);
    io.to(user.activeRoomLink).emit('chat', data);
    console.log(Object.entries(io.clients().server.eio.clients)); //TODO выводит список пользователей
    console.log('rooms', Object.keys(client.rooms)) //TODO выводит список комнат в которых пользователь подписан почистить localstorage и поправить инпуты
    // console.log(` ${user.name} active room ${user.activeRoomLink.replace('/chat_', '')}`)
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

  client.on('uploadSubscribeRooms', (subscribeRooms) => {
    Object.assign(user.connectedRooms, subscribeRooms);
  });

  function join(room) {
    user.activeRoomLink = room;
    Object.assign(user.connectedRooms, { [room]: true });
    client.join(room);
    client.emit('subscribe room', user.connectedRooms);
    client.emit('relocate', `/chat_${room}`);
  }

  function checkOnNewJoin(room) {
    let isNewJoin = !Object.keys(user.connectedRooms).filter(
      (croom) => croom == room
    ).length;
    if (isNewJoin) {
      emittedInRoom(room);
    }
  }

  function emittedInRoom(room, message) {
    let time = getTime();
    message = message ? message : `*вошел в комнату ${room}*`;
    client.broadcast.to(user.activeRoomLink).emit('chat', {
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
    flood: {
      name: 'flood',
      link: '/chat_flood',
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
  //  connectedRooms: object
  //},
};
