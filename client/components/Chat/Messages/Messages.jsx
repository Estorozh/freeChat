import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { chat } from '@/mock-file.json';
import connect from 'react-redux';
import RenderMessage from './components/RenderMessage';
import MessageInput from './components/MessageInput';
import openSocket from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { messages } from '@c/Chat/reducers';

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

function Messages(props) {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  // chat.forEach((msg) => setAllMessages([...allMessages, msg]));

  const socket = openSocket('localhost:5000', {
    transports: ['websocket', 'polling', 'flashsocket'],
  });
  useEffect(() => {
    socket.on('connection');
    //TODO нужно отправлять не в местный стейт, а в редакс сообщения
    socket.on('chat', (data) => {
      setAllMessages([...allMessages, data]);
    });
    return () => socket.disconnect();
  }, [allMessages]);

  // TODO с оповещением все ок. Можно будет только добавить параметров timestamp, id
  const sendMessage = (message) => {
    socket.emit('chat', { message, user: props.name });
    setMessage('');
  };
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
      {allMessages &&
        allMessages.map((msg, i) => <RenderMessage msg={msg} key={i} />)}
      <MessageInput
        // setMessage={setMessage}
        sendMessage={sendMessage}
        // msg={message}
      />
    </main>
  );
}

// const mapStateToProps = (state) => ({
//   name: state.auth.user,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       messages,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(Messages);
export default Messages;
