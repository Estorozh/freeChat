import openSocket from 'socket.io-client';

function io() {
  var socket;
  return {
    connect: (url) =>
      (socket = openSocket(url, {
        transports: ['websocket', 'polling', 'flashsocket'],
      })),
    getSocket: () => {
      return socket;
    },
  };
}

export default io;
