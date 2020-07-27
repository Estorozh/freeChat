const express = require('express');
const app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(5000);

// app.get('/api', (req, res) => {
//   res.sendFile(__dirname, 'index.html');
// });

var FreeChat = {
  chatRooms: {
    general: {
      name: 'general',
      link: '/chat_general',
      messages: [],
    },
  },
  // string:
  // {
  //   name: string,
  //   link: string,
  //   messages: array,
  // }
  users: {},
  //{
  //  name: string,
  //  activeRoom: string,
  //},
};

io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  users[client.id] = {
    name: 'anonim',
    activeRoom: 'General',
  };
  let user = users[client.id];
  client.join(user.activeRoom);
  // eslint-disable-next-line no-console
  console.log('a user connected ' + client.id);

  client.on('auth', (name) => {
    user.name = name;
  });

  //TODO отправить список всех пользователей

  //TODO отправить список всех комнат
  client.on('reqRoomsUsers', (numberList) => {
    let target = chatRooms;
    if (numberList == 1) {
      target = users;
    }
    let data = Object.values(target).map((data) => data.name);
    io.emit('resRoomsUsers', data);
  });

  //TODO при входе с именем, но с отличным url делать смену активной комнаты

  client.on('create room', (name) => {
    let isRepeated = Object.keys(chatRooms).filter(
      (room) => room.name === name
    );
    if (!isRepeated.length) {
      chatRooms[name] = { name, link: `chat_${name}` };
    }
    client.join(name);
    //TODO оповещаем пользователей в комнате о входе
    // client
    //   .to(users[client.id].activeRoom)
    //   .emit('join user', users[client.id].name);
    // console.log(chatRooms.map((o) => o.link));
    // io.sockets.connected[client.id].emit('send name', name);
  });

  client.on('disconnect', () => {
    delete users[client.id];
  });

  //TODO отправляем сообщение в комнату в которой находимся
  client.on('chat', (data) => {
    // const { room, message } = data;
    // eslint-disable-next-line no-console
    console.log('Message received -->', data);
    io.to(user.activeRoom).emit('chat', data);

    // client.to(room).emit('message', data);

    // io.emit('chat', data);

    //TODO ниже код пишет в личные сообщения если в to поставить имя пользователя
    // io.to(users[client.id].activeRoom).emit('chat', data);
  });

  //TODO кто-то печатает
  // client.on('typing', ({room}) => {
  //   client.to(room).emit('typing', 'Someone is typing');
  // });
  // client.on('stopped_typing', ({room}) => {
  //    client.to(room).emit('stopped_typing');
  // });

  //TODO реализовать переход в комнату
  // client.on('join_room', (room) => {
  //   client.join(room);
  // });

  // client.on('getRooms', () => {
  //   // по не проверенной информации должно отправить только вызвавшему клиенту
  //   io.sockets.socket(client.id).emit(
  //     'getRooms',
  //     FreeChat.rooms.map((room) => room.name)
  //   );
  // });
});
