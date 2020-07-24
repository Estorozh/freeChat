import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    auth: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      margin: '0 auto',
    },
  })
);

const Auth = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.auth}>
      ТЕСТ
    </Paper>
  );
};

export default Auth;
