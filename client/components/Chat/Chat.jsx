import React from 'react';
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
import { Redirect } from 'react-router-dom';

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

function Chat(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  props.authFromLocalStorage({ type: 'LOGIN_FROM_LOCALESTORAGE' });

  return (
    <>
      {!localStorage.getItem('isAuth') && <Redirect to="/" />}
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
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <ListRoom
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Messages name={props.name} />
    </>
  );
}

export default Chat;
