const express = require('express');
const app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(5000);

// app.get('/api', (req, res) => {
//   res.sendFile(__dirname, 'index.html');
// });

var FreeChat = {
  chatRooms: [],
  // [{
  //   title: '',
  //   link: '',
  //   messages: [],
  // }],
  users: {},
  //{
  //  name: '',
  //  chatRooms: [],
  //  activeRoom: '',
  //},
};

io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  // eslint-disable-next-line no-console
  console.log('a user connected ' + client.id);

  client.on('create room', (name) => {
    users[client.id] = { name, chatRooms: [name], activeRoom: name };

    // если такая комната уже есть, то только присоединить пользователя
    let isRepeated = !chatRooms.filter((room) => room.title === name).length;
    if (isRepeated) {
      chatRooms.push({ title: name, link: `chat_${name}` });
    }
    client.join(name);
    console.log(isRepeated)
    // оповещаем пользователей в комнате о входе
    // client
    //   .to(users[client.id].activeRoom)
    //   .emit('join user', users[client.id].name);
    console.log(chatRooms.map((o) => o.link));
    // io.sockets.connected[client.id].emit('send name', name);
  });

  client.on('disconnect', () => {
    delete users[client.id];
  });

  //TODO при подключении отправлять сообщение о подключении
  client.on('chat', (data) => {
    // const { room, message } = data;
    // eslint-disable-next-line no-console
    console.log('Message received -->', data);
    io.to(users[client.id].activeRoom).emit('chat', data);

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
  //     FreeChat.rooms.map((room) => room.title)
  //   );
  // });
});
