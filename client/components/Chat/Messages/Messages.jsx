import React, { useEffect, useRef, useState, useCallback } from 'react';
import RenderMessage from './components/RenderMessage';
import MessageInput from './components/MessageInput';
import { useStyles } from './stylesMessages';

// import socket from 'socket.io-client';
// import { SocketContext } from '@c/App';

function Messages(props) {
  const classes = useStyles();
  let content = useRef(null);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [members, setMembers] = useState([]);
  // const { io } = React.useContext(SocketContext);
  const formatTime = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const sendMessage = useCallback(
    (message) => {
      const time = formatTime.format(new Date());
      io.emit('chat', { message, user: props.name, time });
      setMessage('');
    },
    [props.name]
  );

  io.once('resMessages', (messages) => {
    setAllMessages(messages);
  });

  io.once('chat', (data) => {
    setAllMessages([...allMessages, data]);
  });

  useEffect(() => {
    if (content.current) {
      content.current.scrollIntoView(false);
    }
  });

  return (
    <main className={classes.content} ref={content}>
      <div className={classes.toolbar} />
      {members && members.map((user) => <p>{user}</p>)}

      {allMessages &&
        allMessages.map((msg, i) => <RenderMessage msg={msg} key={i} />)}
      <MessageInput sendMessage={sendMessage} />
    </main>
  );
}

export default Messages;
