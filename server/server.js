const express = require('express');
const app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.listen(5000);

// app.get('/api', (req, res) => {
//   res.sendFile(__dirname, 'index.html');
// });

var FreeChat = {
  chatRooms: [
    {
      title: 'Hello Worlds',
      link: 'helloWorlds',
      messages: [],
    },
  ],
  users: {},
};

io.on('connection', (client) => {
  let { chatRooms, users } = FreeChat;
  // eslint-disable-next-line no-console
  console.log('a user connected ' + client.id);

  client.on('create room', (name) => {
    users[client.id] = { name, chatRooms: [name], activeRoom: name };

    chatRooms.push({ title: name, link: `chat_${name}` });
    console.log('join to room', name);
    client.join(name);
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

    // client.to(room).emit('message', data);

    // io.emit('chat', data);
    client.to(users[client.id].activeRoom).emit('chat', data);
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
