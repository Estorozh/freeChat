import React, { useEffect } from 'react';
import { useStyles } from './stylesApp';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Chat from '@c/Chat/Chat';
import Auth from '@c/Auth/Auth';

export function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/chat_:name" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
