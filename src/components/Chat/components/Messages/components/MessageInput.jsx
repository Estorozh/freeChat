import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AttachFile as AttachFileIcon } from '@material-ui/icons';
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
      paddingLeft: 30,
      paddingBottom: 3,
      padding: '5px 0 3px 30px',
    },
    addFile: {
      position: 'absolute',
      top: 5,
      left: 3,
      cursor: 'pointer',
    },
  })
);

export default function MessageInput() {
  const classes = useStyles();

  return (
    <div className={classes.messageInputWrapper}>
      <AttachFileIcon className={classes.addFile} />
      <Paper className={classes.messageInput} elevation={6}>
        <Input fullWidth placeholder="Type your message…" />
      </Paper>
    </div>
  );
}
