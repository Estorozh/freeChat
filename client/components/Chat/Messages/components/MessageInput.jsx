import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { Paper, Input } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    messageInputWrapper: {
      position: 'sticky',
      left: 'auto',
      right: 0,
      bottom: 0,
      width: `100%`,
      marginTop: 10,
    },
    messageInput: {
      paddingRight: 40,
      paddingBottom: 3,
      padding: '5px 0 3px 30px',
    },
    sendMessage: {
      position: 'absolute',
      top: 7,
      right: 3,
      cursor: 'pointer',
    },
  })
);

function MessageInput(props) {
  const classes = useStyles();
  const [msg, setMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    props.sendMessage(msg);
  }

  return (
    <div className={classes.messageInputWrapper}>
      <Paper className={classes.messageInput} elevation={6}>
        <form action="" onSubmit={handleSubmit}>
          <Input
            fullWidth
            placeholder="Type your message…"
            onChange={(e) => setMsg(e.target.value)}
            // onSubmit={() => props.sendMessage()}
            value={msg}
          />
          <SendIcon className={classes.sendMessage} onClick={handleSubmit} />
        </form>
      </Paper>
    </div>
  );
}

export default MessageInput;
