module.exports = class GetMessage {
  getMessage(str) {
    return typeof str === 'string' ? str : 'ksdjflkgjdsfjg';
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
