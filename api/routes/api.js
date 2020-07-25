const GetMessage = require('../actions');
const errors = require('./errors');

module.exports = class Router {
  constructor() {
    this.getMessage = new GetMessage();
  }

  parseRequest(msg) {
    let data = false;
    try {
      data = JSON.parse(msg);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    return data;
  }

  go(req, ws, msg) {
    let data = this.parseRequest(msg);
    if (data) {
      switch (data.get) {
        case 'getMessage':
          this.getMessage.response(ws, data);
          break;

        default:
          console.log('data', data.get)
          ws.send(JSON.stringify(errors['404']));
          break;
      }
    } else {
      ws.send(JSON.stringify(errors['404']));
    }
  }
};
