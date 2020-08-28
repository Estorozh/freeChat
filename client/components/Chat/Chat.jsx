import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ListRoomUser from './ListRoomUser/ListRoomUser';
import Messages from './Messages/Messages';
import { Menu as MenuIcon } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './stylesChat';

function Chat({ history }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, _] = useState(localStorage.getItem('user') || auth());
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  io.emit('auth', name);

  if (history.action == 'POP') {
    let room = location.pathname.replace('/chat_', '');
    io.emit('join', room);
  }

  io.once('relocate', (room) => history.push(room));

  return (
    <>
      {/* {!localStorage.getItem('isAuth') && <Redirect to="./" />} */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Free Chat
          </Typography>
          <Typography variant="h6" noWrap style={{ marginLeft: 'auto' }}>
            {name}
            <ExitToAppIcon
              className={classes.exit}
              onClick={() => {
                localStorage.clear();
                history.push('/');
              }}
              color="action"
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <ListRoomUser
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Messages name={name} />
    </>
  );
}

function auth() {
  let name = prompt('введите ваше имя латиницой или кирилицей');
  if (name != null && /[a-zA-Zа-яА-ЯёЁ]/g.test(name)) {
    localStorage.setItem('user', name);
    return name;
  }
  return auth();
}

export default Chat;
