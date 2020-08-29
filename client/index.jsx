import React from 'react';
import App from '@c/App';
import { render } from 'react-dom';
import socket from 'socket.io-client';
import store from '@r/store';
import { Provider } from 'react-redux';

window.io = socket('unlock-code.org:5000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

let app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById('root'));
