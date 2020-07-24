import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Chat from '@c/Chat/Chat';
import Auth from './Auth';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: '100vh',
    },
  })
);

export function App() {
  // const { window } = props;
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/chat" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
