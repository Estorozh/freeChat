import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Chat from '@c/Chat';
import Auth from './Auth';
import { Provider } from 'react-redux';
import store from '@r/store';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: '100vh',
    },
  })
);

export function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={classes.root}>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/chat" component={Chat} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
