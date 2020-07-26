const express = require('express');
const app = express();
// let expressWS = require('express-ws')(app);
// let io = require('socket.io')(expressWS);

var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.set('port', process.env.PORT || 5000);
// http.listen(process.env.PORT || 5000, function () {
//   console.log('Запускаю сервер на порте 5000');
// });
io.listen(5000);

app.get('/api', (req,res) => {
  res.send('text response');
});

io.on('connection', (client) => {
  console.log('a user connected ' + client.id);

  client.on('chat', (data) => {
    console.log('Message received -->', data);

    io.emit('chat', data);
  });
});
