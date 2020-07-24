import React, { useEffect, useRef } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { chat } from '@/mock-file.json';
import RenderMessage from './components/RenderMessage';
import MessageInput from './components/MessageInput';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

function Messages() {
  const classes = useStyles();
  let content = useRef(null);
  useEffect(() => {
    // скроллим в самый низ при обновлении
    if (content.current) {
      content.current.scrollIntoView(false);
    }
  });
  return (
    <main className={classes.content} ref={content}>
      <div className={classes.toolbar} />
      {chat && chat.map((msg, i) => <RenderMessage msg={msg} key={i} />)}
      <MessageInput />
    </main>
  );
}

export default Messages;
