import React, { useState, useEffect } from 'react';
import {
  AppBar,
  IconButton,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ListRoom from './ListRoom/ListRoom';
import Messages from './Messages/Messages';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

function Chat({ history }) {
  const classes = useStyles();
  const thisRoom = history.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [name, _] = useState(localStorage.getItem('user') || auth());
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  io.emit('auth', name);

  if (history.action == 'POP') {
    let room = location.pathname.replace('/chat_', '');

    let isEmptySubscribe =
      JSON.parse(localStorage.getItem('subscribeRoom')) == null;
    if (isEmptySubscribe) {
      localStorage.setItem('subscribeRoom', JSON.stringify({ [room]: true }));
    }

    io.emit('join', room);
  }

  io.on('relocate', (room) => history.push(room));

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
          </Typography>
        </Toolbar>
      </AppBar>
      <ListRoom
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
