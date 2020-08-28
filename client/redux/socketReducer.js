import socket from 'socket.io-client';

let initialState = {
  socket: socket('localhost:5000', {
    transports: ['websocket', 'polling', 'flashsocket'],
  }),
  connect: () => initialState.socket.emit('connection'),
  disconnect: () => initialState.socket.disconnect(),
};

export const socketReducer = (state = initialState, action) => {
  return state;
};
