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
  })
);

export default function RenderMessage(props) {
  const { msg, index } = props;
  const classes = useStyles();
  const clientMessage = msg.sender === 'me';
  const userAvatar = <Avatar>{msg.sender[0]}</Avatar>;
  const message = (
    <>
      {!clientMessage && (
        <Typography style={{ fontWeight: 700 }}>{msg.sender}</Typography>
      )}
      <Typography variant="body1">{msg.text}</Typography>
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
      </Paper>
      {clientMessage && userAvatar}
    </div>
  );
}
