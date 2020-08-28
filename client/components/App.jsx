import React, { useEffect, useLayoutEffect } from 'react';
import { useStyles } from './stylesApp';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Chat from '@c/Chat/Chat';
import Auth from '@c/Auth/Auth';
import { connect } from 'react-redux';

export function App(props) {
  let { socketReducer } = props;
  const classes = useStyles();

  useEffect(() => {
    async function connect() {
      await socketReducer.connect();
    }
    connect();
    return socketReducer.disconnect();
    // io.emit('connection');
    // return () => io.disconnect();
  }, [socketReducer]);

  return (
    <div className={classes.root}>
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/chat_:name" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

let mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, null)(App);
