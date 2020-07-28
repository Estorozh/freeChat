import React from 'react';
import { useStyles } from './stylesApp';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Chat from '@c/Chat/Chat';
import Auth from '@c/Auth/Auth';
import socket from 'socket.io-client';
import { createBrowserHistory } from 'history';

window.io = socket('localhost:5000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});
// export const SocketContext = React.createContext(io);

export function App() {
  const history = createBrowserHistory();
  const unlistenHistory = history.listen(); //Может потом удалить если не буду использовать
  const classes = useStyles();
  return (
    // <SocketContext.Provider value={io}>
    <BrowserRouter>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/chat_:name" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
    // </SocketContext.Provider>
  );
}
