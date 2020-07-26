import React from 'react';
import { Avatar, Typography, Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    wrapMessage: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: 10,
    },
    wrapMyMessage: {
      justifyContent: 'flex-end',
    },
    message: {
      maxWidth: '70%',
      minWidth: '10%',
      margin: '0 10px',
      padding: 5,
    },
    clientMessage: {
      backgroundColor: '#dfecfb',
    },
    time: {
      fz: 11,
      color: '#666',
    },
  })
);

export default function RenderMessage(props) {
  const { msg, index } = props;
  const classes = useStyles();
  const clientMessage = msg.user === localStorage.getItem('user');
  const userAvatar = <Avatar>{msg.user[0]}</Avatar>;

  const message = (
    <>
      {!clientMessage && (
        <Typography style={{ fontWeight: 700 }}>{msg.user}</Typography>
      )}
      <Typography variant="body1">{msg.message}</Typography>
    </>
  );

  return (
    <div
      className={[
        classes.wrapMessage,
        clientMessage ? classes.wrapMyMessage : '',
      ].join(' ')}
    >
      {!clientMessage && userAvatar}
      <Paper
        className={[
          classes.message,
          clientMessage ? classes.clientMessage : '',
        ].join(' ')}
      >
        {message}
        <span className={classes.time}>{msg.time}</span>
      </Paper>
      {clientMessage && userAvatar}
    </div>
  );
}
