module.exports = class GetMessage {
  getMessage(str) {
    return typeof str === 'string' ? str : 'alowed only string type in text';
  }

  response(ws, data) {
    if (data.text) {
      ws.send(
        JSON.stringify({
          code: 200,
          message: 'OK',
          data: this.getMessage(data.text),
        })
      );
    } else {
      ws.send(JSON.stringify(errors['400']));
    }
  }
};

module.exports = class Connection {
  response(ws, data) {
    io.on('connection', (client) => {
      console.log('a user connected');

      client.on('chat', (data) => {
        console.log('recieved message - ', data);

        io.emit('chat', data);
      });
    });
  }
};
