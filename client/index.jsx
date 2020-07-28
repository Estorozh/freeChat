import React from 'react';
import { App } from '@c/App';
import { render } from 'react-dom';
import socket from 'socket.io-client';

window.io = socket('localhost:5000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});
window.drawerWidth = 280;
render(<App />, document.getElementById('root'));
