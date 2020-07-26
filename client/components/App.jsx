import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Chat from '@c/Chat/Chat';
import Auth from '@c/Auth/Auth';
import socket from 'socket.io-client';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: '100vh',
    },
  })
);

window.io = socket('localhost:5000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});
// export const SocketContext = React.createContext(io);

export function App() {
  const name = localStorage.getItem('user');
  const classes = useStyles();
  return (
    // <SocketContext.Provider value={io}>
    <BrowserRouter>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/chat" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
    // </SocketContext.Provider>
  );
}
