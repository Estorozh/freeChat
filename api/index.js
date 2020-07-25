const express = require('express');
const Router = require('./routes/api');

let router = new Router();
let app = express();
let port = process.env.PORT || 9000;
let expressWS = require('express-ws')(app);

app.ws('/', function (ws, req, next) {
  ws.on('message', function (msg) {
    router.go(req, ws, msg);
  });
});

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Started listening at port %d', port);
});
